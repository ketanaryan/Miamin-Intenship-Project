import React, { useState } from 'react';
import { Search, Clock, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { 
    name: "Pizza", 
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    count: 45
  },
  { 
    name: "Sushi", 
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    count: 32
  },
  { 
    name: "Burgers", 
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50",
    count: 28
  },
  { 
    name: "Indian", 
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    count: 36
  },
  { 
    name: "Thai", 
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    count: 25
  },
  { 
    name: "Desserts", 
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    count: 42
  },
  {
    name: "Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    count: 30
  },
  {
    name: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e",
    count: 22
  }
];

const restaurants = [
  {
    id: 1,
    name: "Bella's Italian",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: 4.5,
    deliveryTime: "25-30",
    cuisine: "Italian",
    priceRange: "Rs-1000-1200",
    featured: true
  },
  {
    id: 2,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    rating: 4.8,
    deliveryTime: "30-35",
    cuisine: "Japanese",
    priceRange: "Rs-800-900",
    featured: true
  },
  {
    id: 3,
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50",
    rating: 4.3,
    deliveryTime: "20-25",
    cuisine: "American",
    priceRange: "Rs-700-900"
  },
  {
    id: 4,
    name: "Spice Paradise",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    rating: 4.6,
    deliveryTime: "35-40",
    cuisine: "Indian",
    priceRange: "Rs-600-700",
    featured: true
  }
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Delicious food,
              <br />delivered to you
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg mb-8"
            >
              Order from your favorite restaurants with easy, on-demand delivery.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center bg-white rounded-full p-2 shadow-xl"
            >
              <Search className="w-6 h-6 text-gray-400 mx-3" />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                className="flex-1 border-none focus:outline-none p-2 bg-transparent"
              />
              <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
                Search
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Browse Categories</h3>
          <button className="text-orange-600 hover:text-orange-700 flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.03 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 flex flex-col justify-end p-4">
                  <h4 className="text-white text-xl font-bold mb-1">{category.name}</h4>
                  <p className="text-white/80 text-sm">{category.count} restaurants</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Restaurants</h3>
          <button className="text-orange-600 hover:text-orange-700 flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.filter(r => r.featured).map((restaurant) => (
            <motion.div
              key={restaurant.id}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{restaurant.name}</h4>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm space-x-4">
                  <span>{restaurant.cuisine}</span>
                  <span>{restaurant.priceRange}</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.deliveryTime} mins
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;