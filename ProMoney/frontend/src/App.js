import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Incomes from './components/Incomes';
import Home from './components/Home';
import Expenses from './components/Expenses';
import Savings from './components/Savings';
import Categories from './components/Categories';  // Importamos Categories
import Cryptos from './components/Cryptos';  // Importamos Cryptos
import Settings from './components/Settings';
import Updates from './components/Updates';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './i18n';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/incomes"
            element={
              <PrivateRoute>
                <Incomes />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <Expenses />
              </PrivateRoute>
            }
          />
          <Route
            path="/savings"
            element={
              <PrivateRoute>
                <Savings />
              </PrivateRoute>
            }
          />
          {/* Nuevas rutas */}
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/cryptos"
            element={
              <PrivateRoute>
                <Cryptos />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/updates"
            element={
              <PrivateRoute>
                <Updates />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
