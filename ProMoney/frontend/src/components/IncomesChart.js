import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { generateIncomeColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/incomes';

const IncomesChart = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get(API_URL);
        setIncomes(response.data);
      } catch (error) {
        console.error('Error fetching incomes:', error);
      }
    };

    fetchIncomes();
  }, []);

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

export default IncomesChart;
