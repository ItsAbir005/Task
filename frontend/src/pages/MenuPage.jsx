import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSession } from '../context/SessionContext';
import MenuList from '../components/Menu/MenuList';
import Cart from '../components/Cart/Cart';

const MenuPage = () => {
  const { getItemCount } = useCart();
  const { customerName } = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get('table');

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Info */}
            <div>
              <h1 className="text-2xl font-bold text-orange-600">
                🍽️ Digital Menu
              </h1>
              <div className="flex items-center gap-3 mt-1">
                {tableNumber && (
                  <span className="text-sm text-gray-600">Table {tableNumber}</span>
                )}
                {customerName && (
                  <span className="text-sm text-gray-600">
                    👤 {customerName}
                  </span>
                )}
              </div>
            </div>

            {/* My Orders Button */}
            <button
              onClick={() => navigate('/my-orders')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition"
            >
              My Orders
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MenuList />
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Cart />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart Button - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-30">
        <button
          onClick={() => navigate('/cart')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
        >
          View Cart ({getItemCount()} items)
        </button>
      </div>
    </div>
  );
};

export default MenuPage;