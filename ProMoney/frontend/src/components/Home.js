import React, { useState, useEffect } from 'react';
import { fetchExpenses, fetchIncomes, fetchSavings } from '../utils/api';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('€');

  useEffect(() => {
    const loadData = async () => {
      const fetchedExpenses = await fetchExpenses();
      const fetchedIncomes = await fetchIncomes();
      const fetchedSavings = await fetchSavings();
      
      setExpenses(fetchedExpenses);
      setIncomes(fetchedIncomes);
      setSavings(fetchedSavings);
      

      const totalIncomes = fetchedIncomes.reduce((acc, income) => acc + income.amount, 0);
      const totalExpenses = fetchedExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      setBalance(totalIncomes - totalExpenses);
    };

    loadData();
    

    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const balanceStyle = {
    color: balance >= 0 ? 'green' : 'red',
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>{t('welcomeMessage.title')}</h1>
        <p>{t('welcomeMessage.description')}</p>
      </div>
      <div className="balance-section">
        <h2>{t('balance')}</h2>
        <div className="balance-total" style={balanceStyle}>
          {t('balance_total')}: {balance.toFixed(2)} {currency}
        </div>
      </div>
      <div className="savings-section">
        <h2>{t('savings')}</h2>
        <div className="savings-total">
          {t('total_savings')}: {savings.reduce((acc, saving) => acc + saving.amount, 0).toFixed(2)} {currency}
        </div>
      </div>
      <div className="help-section">
        <h2>{t('help.title')}</h2>
        <div dangerouslySetInnerHTML={{ __html: t('help.description') }} />
      </div>
    </div>
  );
};
export default Home;
