const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const menuData = [
  { 
    id: 1, 
    name: "Margherita Pizza", 
    price: 12, 
    category: "Mains",
    description: "Classic tomato sauce, mozzarella, and fresh basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
  },
  { 
    id: 2, 
    name: "Iced Americano", 
    price: 4, 
    category: "Drinks",
    description: "Freshly brewed espresso over ice",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
  },
  { 
    id: 3, 
    name: "Garlic Bread", 
    price: 6, 
    category: "Sides",
    description: "Toasted bread with garlic butter and herbs",
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400"
  },
  { 
    id: 4, 
    name: "Caesar Salad", 
    price: 8, 
    category: "Starters",
    description: "Romaine lettuce, parmesan, croutons, Caesar dressing",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
  },
  { 
    id: 5, 
    name: "Chocolate Lava Cake", 
    price: 7, 
    category: "Desserts",
    description: "Warm chocolate cake with molten center",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400"
  },
  { 
    id: 6, 
    name: "Cappuccino", 
    price: 5, 
    category: "Drinks",
    description: "Espresso with steamed milk and foam",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
  }
];

router.get('/', protect, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: menuData.length,
      data: menuData
    });
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
});
router.get('/:id', protect, (req, res) => {
  try {
    const item = menuData.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Menu item fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu item',
      error: error.message
    });
  }
});

module.exports = router;