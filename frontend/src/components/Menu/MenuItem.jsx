import React from 'react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
            <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
              {item.category}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-xl font-bold text-orange-500">${item.price}</p>
          </div>
        </div>

        {item.description && (
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        )}

        <button
          onClick={() => addToCart(item)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;