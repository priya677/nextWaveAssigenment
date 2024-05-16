const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create an item
router.post('/', async (req, res) => {
  const { name, description, quantity } = req.body;
  try {
    const newItem = new Item({ name, description, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read one item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (req.body.name != null) {
      item.name = req.body.name;
    }
    if (req.body.description != null) {
      item.description = req.body.description;
    }
    if (req.body.quantity != null) {
      item.quantity = req.body.quantity;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
