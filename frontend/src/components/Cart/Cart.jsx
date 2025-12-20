import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../services/api';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, getTotal, getItemCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get('table');

  const handlePlaceOrder = async () => {
    setError('');
    setLoading(true);

    try {
      const orderData = {
        items: cart,
        total: getTotal(),
        table: tableNumber ? parseInt(tableNumber) : null,
      };

      const response = await orderAPI.create(orderData);

      // Clear cart and navigate to success page
      clearCart();
      navigate('/order-success', {
        state: {
          orderId: response.data.orderId,
          total: getTotal(),
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-500">Add some delicious items to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {/* Table Number */}
      {tableNumber && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 mb-4">
          <p className="text-sm text-orange-700">
            📍 Table Number: <span className="font-semibold">{tableNumber}</span>
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-1 mb-6">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Items ({getItemCount()})</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span className="text-orange-500">${getTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl mt-6 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Cart;