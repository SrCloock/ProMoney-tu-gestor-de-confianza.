const express = require('express');
const router = express.Router();
const Savings = require('../models/Savings');

router.get('/', async (req, res) => {
  try {
    const savings = await Savings.find().populate('category');
    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { description, amount, date, category } = req.body;
  const newSaving = new Savings({
    description,
    amount,
    date,
    category,
  });

  try {
    const savedSaving = await newSaving.save();
    res.status(201).json(savedSaving);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Savings.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Saving not found' });
    res.json({ message: 'Saving deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const saving = await Savings.findById(req.params.id);
    if (!saving) return res.status(404).json({ message: 'Saving not found' });

    saving.description = req.body.description || saving.description;
    saving.amount = req.body.amount || saving.amount;
    saving.date = req.body.date || saving.date;
    saving.category = req.body.category || saving.category;

    const updatedSaving = await saving.save();
    res.json(updatedSaving);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
