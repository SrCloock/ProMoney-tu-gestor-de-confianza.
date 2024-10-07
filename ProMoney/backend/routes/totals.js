

const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Savings = require('../models/Savings');


router.get('/totals', async (req, res) => {
  try {
    const totalIncomes = await Income.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const totalExpenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const totalSavings = await Savings.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);

    res.json({
      incomes: totalIncomes[0]?.total || 0,
      expenses: totalExpenses[0]?.total || 0,
      savings: totalSavings[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
