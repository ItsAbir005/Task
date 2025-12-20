const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, table } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide order items'
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order total'
      });
    }
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const formattedItems = items.map(item => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    const order = await Order.create({
      user: req.user._id,
      orderId,
      items: formattedItems,
      total,
      tableNumber: table || null
    });

    // Populate user details
    await order.populate('user', 'name email');

    console.log(` New order created: ${orderId} for user ${req.user.name}`);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      order: {
        id: order._id,
        orderId: order.orderId,
        items: order.items,
        total: order.total,
        tableNumber: order.tableNumber,
        status: order.status,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Fetch all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

module.exports = router;