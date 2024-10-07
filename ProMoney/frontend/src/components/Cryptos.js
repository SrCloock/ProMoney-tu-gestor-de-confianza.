import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Cryptos.css';

const API_URL = 'http://api.coinlayer.com/live?access_key=4655f0940e65301e448e9f2ba5e34494';
const CARDS_PER_PAGE = 18;

const Cryptos = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState(null);
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const abbreviateWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };


  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log(t('connect_wallet'), accounts[0]);
        loadPricesFromLocalStorage();
      } else {
        alert(t('connect_wallet'));
      }
    } catch (error) {
      console.error('Error conectando la wallet:', error);
    }
  };


  const disconnectWallet = () => {
    setAccount(null);
    console.log(t('disconnect_wallet'));
  };

 
  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      console.log('Datos de la API:', response.data);

      if (response.data && response.data.success && response.data.rates) {
        const pricesArray = Object.keys(response.data.rates).map(key => ({
          name: key,
          price: response.data.rates[key]
        }));
        setPrices(pricesArray);
        localStorage.setItem('cryptoPrices', JSON.stringify(pricesArray));
      } else {
        setError(t('error_fetching_prices'));
      }
    } catch (error) {
      console.error('Error obteniendo precios:', error.response ? error.response.data : error.message);
      setError(t('error_fetching_prices'));
    } finally {
      setLoading(false);
    }
  };


  const loadPricesFromLocalStorage = () => {
    const storedPrices = localStorage.getItem('cryptoPrices');
    if (storedPrices) {
      setPrices(JSON.parse(storedPrices));
    } else {
      fetchPrices();
    }
  };

  useEffect(() => {
    loadPricesFromLocalStorage();
  }, []);

  const filteredAndSortedPrices = prices
    .filter(price => price.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      return 0;
    });

  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentPrices = filteredAndSortedPrices.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAndSortedPrices.length / CARDS_PER_PAGE);

  return (
    <div className="crypto-dashboard">
      <h1 className="crypto-title">{t('crypto_dashboard')}</h1>

      {!account ? (
        <button className="wallet-btn" onClick={connectWallet}>{t('connect_wallet')}</button>
      ) : (
        <div className="wallet-info">
          <p className="wallet-address">{t('wallet_verified')}: {abbreviateWalletAddress(account)}</p>
          <button className="wallet-btn" onClick={disconnectWallet}>{t('disconnect_wallet')}</button>
        </div>
      )}

      {account && (
        <div className="verification">
          <p>{t('wallet_verified')}</p>
        </div>
      )}

      <button className="update-btn" onClick={fetchPrices}>{t('update_prices')}</button>

      <input
        className="search-input"
        type="text"
        placeholder={t('search_placeholder')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="sort-select" onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">{t('sort_by_name')}</option>
        <option value="price">{t('sort_by_price')}</option>
      </select>


      {loading ? (
        <p>{t('loading_prices')}</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="crypto-cards">
          {currentPrices.length > 0 ? (
            currentPrices.map(crypto => (
              <div key={crypto.name} className="crypto-card">
                <h2 className="crypto-name">{crypto.name}</h2>
                <p className="crypto-price">{crypto.price.toFixed(2)} USD</p>
              </div>
            ))
          ) : (
            <p>{t('no_cryptos_found')}</p>
          )}
        </div>
      )}


      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t('previous')}
        </button>
        <span className="pagination-info">
          {t('page')} {currentPage} {t('of')} {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default Cryptos;
