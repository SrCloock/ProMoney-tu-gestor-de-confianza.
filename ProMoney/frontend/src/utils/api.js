import axios from 'axios';

const EXPENSES_URL = 'http://localhost:5000/api/expenses';
const SAVINGS_URL = 'http://localhost:5000/api/savings';
const INCOMES_URL = 'http://localhost:5000/api/incomes';

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(EXPENSES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const fetchSavings = async () => {
  try {
    const response = await axios.get(SAVINGS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching savings:', error);
    return [];
  }
};

export const fetchIncomes = async () => {
  try {
    const response = await axios.get(INCOMES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return [];
  }
};
