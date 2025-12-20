import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100">
      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrementQuantity(item.id)}
          className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition"
        >
          <span className="text-gray-700 font-bold">−</span>
        </button>

        <span className="w-8 text-center font-semibold text-gray-800">
          {item.quantity}
        </span>

        <button
          onClick={() => incrementQuantity(item.id)}
          className="w-7 h-7 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition"
        >
          <span className="font-bold">+</span>
        </button>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end gap-1">
        <p className="font-semibold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;