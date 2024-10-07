import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { generateSavingsColors } from '../utils/colorUtils';

const API_URL = 'http://localhost:5000/api/savings';

const SavingsChart = () => {
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get(API_URL);
        setSavings(response.data);
      } catch (error) {
        console.error('Error fetching savings:', error);
      }
    };

    fetchSavings();
  }, []);

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

export default SavingsChart;
