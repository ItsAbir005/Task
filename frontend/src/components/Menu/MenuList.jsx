import React, { useState, useEffect } from 'react';
import { menuAPI } from '../../services/api';
import MenuItem from './MenuItem';

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await menuAPI.getAll();
      setMenu(response.data.data);
    } catch (err) {
      setError('Failed to load menu. Please try again.');
      console.error('Menu fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(menu.map((item) => item.category))];

  // Filter menu by category
  const filteredMenu =
    selectedCategory === 'All'
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default MenuList;