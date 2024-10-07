import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Savings.css';
import { useTranslation } from 'react-i18next';
import { generateSavingsColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/savings';
const CATEGORY_API_URL = 'http://localhost:5000/api/categories';

const Savings = () => {
  const { t } = useTranslation();
  const [savings, setSavings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editSavingId, setEditSavingId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [currency, setCurrency] = useState('€');

  useEffect(() => {
    fetchSavings();
    fetchCategories();
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await axios.get(API_URL);
      setSavings(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching savings:', error);
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

  const calculateTotal = (savings) => {
    const totalAmount = savings.reduce((sum, saving) => sum + saving.amount, 0);
    setTotal(totalAmount);
  };

  const handleAddSaving = async () => {
    const newSaving = { description, amount: parseFloat(amount), date: new Date(), category };
    try {
      await axios.post(API_URL, newSaving);
      setDescription('');
      setAmount('');
      setCategory('');
      fetchSavings();
    } catch (error) {
      console.error('Error adding saving:', error);
    }
  };

  const handleDeleteSaving = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSavings();
    } catch (error) {
      console.error('Error deleting saving:', error);
    }
  };

  const handleEditSaving = async (id) => {
    setEditSavingId(id);
    const saving = savings.find((saving) => saving._id === id);
    setEditDescription(saving.description);
    setEditAmount(saving.amount);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editSavingId}`, {
        description: editDescription,
        amount: parseFloat(editAmount),
        category,
      });
      setEditSavingId(null);
      fetchSavings();
    } catch (error) {
      console.error('Error updating saving:', error);
    }
  };

  const renderChart = () => {
    const data = {
      labels: savings.map(saving => saving.description),
      datasets: [{
        data: savings.map(saving => saving.amount),
        backgroundColor: generateSavingsColors(),
      }],
    };

    return (
      <div className="chart-container">
        <Pie data={data} />
      </div>
    );
  };

  const renderSavingList = () => {
    return (
      <div className="saving-list">
        <h3>{t('saving_list')}</h3>
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
            {savings.map(saving => (
              <tr key={saving._id}>
                <td>{saving.amount.toFixed(2)} {currency}</td>
                <td>{saving.category?.name || t('no_category')}</td>
                <td>{saving.description}</td>
                <td>{new Date(saving.date).toLocaleDateString()}</td>
                <td>
                  <button className="table-button table-button-edit" onClick={() => handleEditSaving(saving._id)}>
                    {t('edit')}
                  </button>
                  <button className="table-button table-button-delete" onClick={() => handleDeleteSaving(saving._id)}>
                    {t('delete_saving')}
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
          <h1>{t('savings')}</h1>
          <div className="total-box">
            {t('total')}: {total.toFixed(2)} {currency}
          </div>
          <div className="add-saving">
            <h3>{t('add_new_saving')}</h3>
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
            <button className="btn-add" onClick={handleAddSaving}>
              {t('add')}
            </button>
          </div>
          {renderChart()}
          {renderSavingList()}
          {editSavingId && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{t('edit_saving')}</h3>
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
                <button className="btn-close" onClick={() => setEditSavingId(null)}>
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

export default Savings;
