import React, { useState, useEffect } from 'react';
import './Settings.css';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState('€');
  const [availableCurrencies, setAvailableCurrencies] = useState([
    { name: 'Dólar', symbol: '$' },
    { name: 'Euro', symbol: '€' },
    { name: 'Libra Esterlina', symbol: '£' },
    { name: 'Yen Japonés', symbol: '¥' },
    { name: 'Rupia India', symbol: '₹' },
    { name: 'Franco Suizo', symbol: '₣' },
    { name: 'Lira Turca', symbol: '₺' },
    { name: 'Rublo Ruso', symbol: '₽' },
    { name: 'Peso Mexicano', symbol: '$' },
    { name: 'Baht Tailandés', symbol: '฿' }
  ]);
  const [language, setLanguage] = useState(i18n.language);
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ]);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('currency', currency);
    i18n.changeLanguage(language);
  };

  return (
    <div className="container">
      <div className="settings-container">
        <div className="settings-content">
          <h1>{t('settings')}</h1>
          <div className="currency-selector">
            <label htmlFor="currency">{t('currency')}:</label>
            <select id="currency" value={currency} onChange={handleCurrencyChange}>
              {availableCurrencies.map((curr) => (
                <option key={curr.symbol} value={curr.symbol}>
                  {curr.name} - {curr.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="language-selector">
            <label htmlFor="language">{t('language')}:</label>
            <select id="language" value={language} onChange={handleLanguageChange}>
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-save" onClick={handleSaveChanges}>
            {t('save_changes')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
