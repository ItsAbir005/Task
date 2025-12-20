const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const menuData = [
  { id: 1, name: "Margherita Pizza", price: 12, category: "Mains" },
  { id: 2, name: "Iced Americano", price: 4, category: "Drinks" },
  { id: 3, name: "Garlic Bread", price: 6, category: "Sides" }
];
app.get('/api/menu', (req, res) => {
  res.json(menuData);
});
app.post('/api/order', (req, res) => {
  const { items, total, table } = req.body;
  const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
  console.log(`New Order Received for Table ${table}:`, items);
  res.status(201).json({
    message: "Order placed successfully!",
    orderId,
    items,
    total
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));