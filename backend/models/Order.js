const Order = require('../models/Order');
router.post('/', async (req, res) => {
  try {
    const { items, total, table, sessionId, customerName } = req.body;
    
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

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
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
      sessionId,
      customerName: customerName || 'Guest',
      orderId,
      items: formattedItems,
      total,
      tableNumber: table || null
    });

    console.log(`✓ New order created: ${orderId} for session ${sessionId}`);

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
    console.error('Fetch orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

module.exports = router;