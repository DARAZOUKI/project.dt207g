// routes/menu.js

const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Debugging: Check if protect middleware is defined
console.log('Protect middleware:', protect);

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a menu item
router.post('/', protect, async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const menuItem = await MenuItem.create({ name, description, price, image });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a menu item
router.put('/:id', protect, async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a menu item
router.delete('/:id', protect, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
