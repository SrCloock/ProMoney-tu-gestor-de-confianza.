import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">{t('home')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/incomes" className="navbar-link">{t('incomes')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/expenses" className="navbar-link">{t('expenses')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/savings" className="navbar-link">{t('savings')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/categories" className="navbar-link">{t('categories')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/cryptos" className="navbar-link">{t('cryptocurrency')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/settings" className="navbar-link">{t('settings')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/updates" className="navbar-link">{t('updates')}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">{t('logout')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
