import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart/Cart';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/menu')}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
        </div>
      </header>

      {/* Cart Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Cart />
      </main>
    </div>
  );
};

export default CartPage;