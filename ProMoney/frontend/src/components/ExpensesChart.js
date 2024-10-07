import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { generateExpenseColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/expenses';

const ExpensesChart = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(API_URL);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

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

export default ExpensesChart;
