const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Asegúrate de que este modelo esté definido correctamente

// Obtener todos los gastos
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category'); // Asegúrate de que la categoría esté poblada
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo gasto
router.post('/', async (req, res) => {
    const { description, amount, date, category } = req.body;
    const expense = new Expense({
        description,
        amount,
        date,
        category,
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un gasto existente
router.put('/:id', async (req, res) => {
    const { description, amount, date, category } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { description, amount, date, category },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un gasto
router.delete('/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        res.json({ message: 'Gasto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
