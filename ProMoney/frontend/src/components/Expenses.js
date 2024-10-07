import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Expenses.css';
import { useTranslation } from 'react-i18next';
import { generateExpenseColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/expenses';
const CATEGORY_API_URL = 'http://localhost:5000/api/categories';

const Expenses = () => {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [currency, setCurrency] = useState('€');

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
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

  const calculateTotal = (expenses) => {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotal(totalAmount);
  };

  const handleAddExpense = async () => {
    const newExpense = { description, amount: parseFloat(amount), date: new Date(), category };
    try {
      await axios.post(API_URL, newExpense);
      setDescription('');
      setAmount('');
      setCategory('');
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = async (id) => {
    setEditExpenseId(id);
    const expense = expenses.find((expense) => expense._id === id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editExpenseId}`, {
        description: editDescription,
        amount: parseFloat(editAmount),
        category,
      });
      setEditExpenseId(null);
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const renderChart = () => {
    const data = {
      labels: expenses.map(expense => expense.description),
      datasets: [{
        data: expenses.map(expense => expense.amount),
        backgroundColor: generateExpenseColors(),
      }],
    };

    return (
      <div className="chart-container">
        <Pie data={data} />
      </div>
    );
  };

  const renderExpenseList = () => {
    return (
      <div className="expense-list">
        <h3>{t('expense_list')}</h3>
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
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td>{expense.amount.toFixed(2)} {currency}</td>
                <td>{expense.category?.name || t('no_category')}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button className="table-button table-button-edit" onClick={() => handleEditExpense(expense._id)}>
                    {t('edit')}
                  </button>
                  <button className="table-button table-button-delete" onClick={() => handleDeleteExpense(expense._id)}>
                    {t('delete_expense')}
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
          <h1>{t('expenses')}</h1>
          <div className="total-box">
            {t('total')}: {total.toFixed(2)} {currency}
          </div>
          <div className="add-expense">
            <h3>{t('add_new_expense')}</h3>
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
            <button className="btn-add" onClick={handleAddExpense}>
              {t('add')}
            </button>
          </div>
          {renderChart()}
          {renderExpenseList()}
          {editExpenseId && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{t('edit_expense')}</h3>
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
                <button className="btn-close" onClick={() => setEditExpenseId(null)}>
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

export default Expenses;
