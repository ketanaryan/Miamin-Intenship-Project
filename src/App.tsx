import React, { useState, useEffect } from 'react';
import { MapPin, ShoppingBag, Home, Menu as MenuIcon, User, Phone, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import { ThemeToggle } from './components/ThemeToggle';
import { CartDrawer } from './components/CartDrawer';
import { AIFoodAssistant } from './components/AIFoodAssistant';
import { useThemeStore } from './store/useThemeStore';
import { useCartStore } from './store/useCartStore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isDarkMode } = useThemeStore();
  const { items } = useCartStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage />;
      case 'signup':
        return <SignupPage />;
      case 'contact':
        return <ContactPage />;
      case 'payment-methods':
        return <PaymentMethodsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-200 ${
        isDarkMode ? 'dark' : ''
      }`}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-orange-600 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              FoodHub
            </motion.h1>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Enter delivery location"
                className="bg-transparent border-none focus:outline-none w-48 dark:text-white"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              onClick={() => setCurrentPage('home')}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              onClick={() => setCurrentPage('menu')}
            >
              <MenuIcon className="w-5 h-5" />
              <span>Menu</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              onClick={() => setCurrentPage('payment-methods')}
            >
              <Star className="w-5 h-5" />
              <span>Payment</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              onClick={() => setCurrentPage('contact')}
            >
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Cart</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </motion.button>
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              onClick={() => setCurrentPage('signup')}
            >
              <User className="w-5 h-5" />
              <span>Sign Up</span>
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* AI Food Assistant */}
      <div
        className={`fixed transition-all duration-300 ${
          currentPage === 'home' ? 'bottom-4 right-4' : 'bottom-4 right-[400px]'
        }`}
      >
        <AIFoodAssistant />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-bold mb-4">FoodHub</h5>
              <p className="text-gray-400">Delivering happiness at your doorstep</p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">About Us</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About us</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help & Support</li>
                <li>Partner with us</li>
                <li>Ride with us</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
