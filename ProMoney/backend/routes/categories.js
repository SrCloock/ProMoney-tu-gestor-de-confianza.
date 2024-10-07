const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
  const { group, name, icon } = req.body;

  if (!group || !name || !icon) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const category = new Category({ group, name, icon });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la categoría' });
  }
});

// Eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
});

// Actualizar una categoría por ID
router.put('/:id', async (req, res) => {
  const { group, name, icon } = req.body;

  if (!group || !name || !icon) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    category.group = group;
    category.name = name;
    category.icon = icon;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la categoría' });
  }
});

module.exports = router;
