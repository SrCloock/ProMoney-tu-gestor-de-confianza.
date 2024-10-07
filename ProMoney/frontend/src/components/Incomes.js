import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Incomes.css';
import { useTranslation } from 'react-i18next';
import { generateIncomeColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/incomes';
const CATEGORY_API_URL = 'http://localhost:5000/api/categories';

const Incomes = () => {
  const { t } = useTranslation();
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editIncomeId, setEditIncomeId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [currency, setCurrency] = useState('€');

  useEffect(() => {
    fetchIncomes();
    fetchCategories();
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(API_URL);
      setIncomes(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const calculateTotal = (incomes) => {
    const totalAmount = incomes.reduce((sum, income) => sum + income.amount, 0);
    setTotal(totalAmount);
  };

  const handleAddIncome = async () => {
    const newIncome = { description, amount: parseFloat(amount), date: new Date(), category };
    try {
      await axios.post(API_URL, newIncome);
      setDescription('');
      setAmount('');
      setCategory('');
      fetchIncomes();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleEditIncome = async (id) => {
    setEditIncomeId(id);
    const income = incomes.find((income) => income._id === id);
    setEditDescription(income.description);
    setEditAmount(income.amount);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editIncomeId}`, {
        description: editDescription,
        amount: parseFloat(editAmount),
        category,
      });
      setEditIncomeId(null);
      fetchIncomes();
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const renderChart = () => {
    const data = {
      labels: incomes.map(income => income.description),
      datasets: [{
        data: incomes.map(income => income.amount),
        backgroundColor: generateIncomeColors(),
      }],
    };

    return (
      <div className="chart-container">
        <Pie data={data} />
      </div>
    );
  };

  const renderIncomeList = () => {
    return (
      <div className="income-list">
        <h3>{t('income_list')}</h3>
        <table>
          <thead>
            <tr>
              <th>{t('amount')}</th>
              <th>{t('category')}</th>
              <th>{t('description')}</th>
              <th>{t('date')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(income => (
              <tr key={income._id}>
                <td>{income.amount.toFixed(2)} {currency}</td>
                <td>{income.category?.name || t('no_category')}</td>
                <td>{income.description}</td>
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td>
                  <button className="table-button table-button-edit" onClick={() => handleEditIncome(income._id)}>
                    {t('edit')}
                  </button>
                  <button className="table-button table-button-delete" onClick={() => handleDeleteIncome(income._id)}>
                    {t('delete_income')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="content">
          <h1>{t('incomes')}</h1>
          <div className="total-box">
            {t('total')}: {total.toFixed(2)} {currency}
          </div>
          <div className="add-income">
            <h3>{t('add_new_income')}</h3>
            <div className="form-row">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t('amount')}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">{t('select_category')}</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('description')}
              />
            </div>
            <button className="btn-add" onClick={handleAddIncome}>
              {t('add')}
            </button>
          </div>
          {renderChart()}
          {renderIncomeList()}
          {editIncomeId && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{t('edit_income')}</h3>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder={t('amount')}
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">{t('select_category')}</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder={t('description')}
                />
                <button className="btn-edit" onClick={handleSaveEdit}>
                  {t('save')}
                </button>
                <button className="btn-close" onClick={() => setEditIncomeId(null)}>
                  {t('close')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Incomes;
