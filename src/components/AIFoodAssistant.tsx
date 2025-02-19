import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function AIFoodAssistant() {
  const [isMinimized, setIsMinimized] = useState(false);

  // Minimized state (bottom-right button)
  if (isMinimized) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsMinimized(false)}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    );
  }

  // Full assistant UI
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 bg-orange-600 text-white flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          <h3 className="font-bold">Food Assistant</h3>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-white hover:text-orange-200"
        >
          Minimize
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            Hello! How can I help you today?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            You can ask me about food, recipes, or nearby restaurants.
          </div>
        </div>
      </div>

      {/* Input Area (Disabled) */}
      <form className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder=""
            className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
            disabled
          />
          <button
            type="button"
            disabled
            className="bg-orange-600 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
}
