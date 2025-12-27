const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  customerName: {
    type: String,
    default: 'Guest'
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    menuItemId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  tableNumber: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
orderSchema.pre('save', async function() {
  this.updatedAt = Date.now();
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);