import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Gift, Shield, CheckCircle } from 'lucide-react';

export default function PaymentMethodsPage() {
  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your credit or debit card',
      brands: ['Visa', 'Mastercard', 'American Express']
    },
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Quick payment with your preferred digital wallet',
      brands: ['Apple Pay', 'Google Pay', 'PayPal']
    },
    {
      id: 'gift-card',
      name: 'Gift Card',
      icon: Gift,
      description: 'Redeem your FoodHub gift card',
      brands: ['FoodHub Gift Card']
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'All transactions are encrypted and secure'
    },
    {
      icon: CheckCircle,
      title: 'Easy Refunds',
      description: 'Hassle-free refund process if something goes wrong'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Payment Methods</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose your preferred payment method for a seamless checkout experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                <method.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold ml-4 text-gray-800 dark:text-white">{method.name}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{method.description}</p>
            <div className="flex flex-wrap gap-2">
              {method.brands.map((brand) => (
                <span
                  key={brand}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-emerald-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Need Help?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our support team is available 24/7 to assist you with any payment-related queries
        </p>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}