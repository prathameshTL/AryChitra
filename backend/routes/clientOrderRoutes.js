const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protectClient } = require('../middleware/authMiddleware');

// GET /api/client/orders
// Get all orders for the logged-in client
router.get('/', protectClient, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching client orders:', error);
    res.status(500).json({ error: 'Server error while fetching orders.' });
  }
});

// GET /api/client/orders/:id
// Get single order for logged-in client
router.get('/:id', protectClient, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching order.' });
  }
});

module.exports = router;
