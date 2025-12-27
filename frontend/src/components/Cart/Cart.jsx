import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSession } from '../../context/SessionContext';
import { orderAPI } from '../../services/api';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const { sessionId, customerName, updateCustomerName } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNameInput, setShowNameInput] = useState(!customerName);
  const [nameInput, setNameInput] = useState(customerName || '');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get('table');

  const cartSummary = useMemo(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { itemCount, total };
  }, [cart]);

  const handlePlaceOrder = async () => {
    console.log('Place Order clicked!'); // Debug log
    console.log('Session ID:', sessionId); // Debug log
    console.log('Cart:', cart); // Debug log

    // Validation
    if (!sessionId) {
      setError('Session not initialized. Please refresh the page.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    // Update name if changed
    if (nameInput && nameInput !== customerName) {
      updateCustomerName(nameInput);
    }

    setError('');
    setLoading(true);

    try {
      const orderData = {
        items: cart,
        total: cartSummary.total,
        table: tableNumber ? parseInt(tableNumber) : null,
        sessionId,
        customerName: nameInput || 'Guest',
      };

      console.log('Sending order data:', orderData); // Debug log

      const response = await orderAPI.create(orderData);

      console.log('Order response:', response); // Debug log

      clearCart();
      navigate('/order-success', {
        state: {
          orderId: response.data.orderId,
          total: cartSummary.total,
        },
      });
    } catch (err) {
      console.error('Order error:', err); // Debug log
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
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
            Table Number: <span className="font-semibold">{tableNumber}</span>
          </p>
        </div>
      )}

      {/* Customer Name Input */}
      {showNameInput ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-4 flex justify-between items-center">
          <p className="text-sm text-blue-700">
            👤 Ordering as: <span className="font-semibold">{customerName}</span>
          </p>
          <button
            onClick={() => setShowNameInput(true)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Change
          </button>
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
          <span>Items ({cartSummary.itemCount})</span>
          <span>${cartSummary.total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
          <span>Total</span>
          <span className="text-orange-500">${cartSummary.total.toFixed(2)}</span>
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