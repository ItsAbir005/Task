const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, total, table, sessionId, customerName } = req.body;
    
    // Validation
    if (!items || items.length === 0) {
      console.log('❌ Validation failed: No items');
      return res.status(400).json({
        success: false,
        message: 'Please provide order items'
      });
    }

    if (!total || total <= 0) {
      console.log('❌ Validation failed: Invalid total');
      return res.status(400).json({
        success: false,
        message: 'Invalid order total'
      });
    }

    if (!sessionId) {
      console.log('❌ Validation failed: No session ID');
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Format items
    const formattedItems = items.map(item => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    // Create order
    const order = await Order.create({
      sessionId,
      customerName: customerName || 'Guest',
      orderId,
      items: formattedItems,
      total,
      tableNumber: table || null
    });

    // Send response
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
    console.error('❌ Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Get my orders
router.get('/my-orders', async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }

    const orders = await Order.find({ sessionId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('❌ Fetch orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

module.exports = router;