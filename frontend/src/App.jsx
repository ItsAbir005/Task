import React, { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (orderSummary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="bg-green-100 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Order Success! [cite: 22]</h2>
          <p className="text-gray-600 mb-4">Order ID: {orderSummary.orderId}</p>
          <button onClick={() => setOrderSummary(null)} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">Order More</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-orange-600">Digital Menu [cite: 4]</h1>
      </header>

      <main className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Menu Items List [cite: 10] */}
        <div className="md:col-span-2 space-y-4">
          {menu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.name} [cite: 11]</h3>
                  <p className="text-gray-500">${item.price} [cite: 11]</p>
                </div>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
              >
                Add [cite: 14]
              </button>
            </div>
          ))}
        </div>

        {/* Floating/Side Cart [cite: 13, 17] */}
        <aside className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto bg-white border-t md:border-t-0 md:border border-gray-200 p-6 md:rounded-xl shadow-2xl md:shadow-none">
          <h2 className="text-xl font-bold mb-4">Your Cart [cite: 13]</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total: [cite: 17]</span>
                <span>${total}</span>
              </div>
              <button 
                onClick={async () => {
                  const res = await fetch('http://localhost:5000/api/order', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ items: cart, total })
                  });
                  const data = await res.json();
                  setOrderSummary(data);
                }}
                className="w-full bg-black text-white py-3 rounded-xl font-bold mt-4"
              >
                Place Order [cite: 19]
              </button>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;