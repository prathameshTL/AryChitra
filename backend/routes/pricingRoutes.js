const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');
const { protect } = require('../middleware/authMiddleware');

// Get all pricing plans
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.find().sort({ order: 1 });
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pricing plans', error: error.message });
  }
});

// Create new pricing plan (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const newPricing = new Pricing(req.body);
    await newPricing.save();
    res.status(201).json(newPricing);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pricing plan', error: error.message });
  }
});

// Update pricing plan (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedPricing = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPricing) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }
    res.json(updatedPricing);
  } catch (error) {
    res.status(400).json({ message: 'Error updating pricing plan', error: error.message });
  }
});

// Delete pricing plan (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedPricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!deletedPricing) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }
    res.json({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pricing plan', error: error.message });
  }
});

module.exports = router;
