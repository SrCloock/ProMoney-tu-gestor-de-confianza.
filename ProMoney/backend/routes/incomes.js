const express = require('express');
const Income = require('../models/Income');
const Category = require('../models/Category');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find().populate('category');
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const { description, amount, date, category } = req.body;

  const income = new Income({
    description,
    amount,
    date,
    category
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { description, amount, date, category } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { description, amount, date, category },
      { new: true }
    );
    res.json(updatedIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
