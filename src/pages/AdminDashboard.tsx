import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useOrderStore } from '../store/useOrderStore';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { profile } = useAuthStore();
  const { restaurants, fetchRestaurants } = useRestaurantStore();
  const { orderHistory, fetchOrderHistory } = useOrderStore();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchRestaurants();
    fetchOrderHistory();
  }, []);

  const renderOrders = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
      {orderHistory.map((order) => (
        <div key={order.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">Total: ${order.total_amount}</p>
            <p className="text-sm text-gray-500">{order.delivery_address}</p>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingBag className="w-6 h-6 text-orange-600" />
          <h4 className="text-lg font-medium">Total Orders</h4>
        </div>
        <p className="text-3xl font-bold">{orderHistory.length}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-6 h-6 text-orange-600" />
          <h4 className="text-lg font-medium">Active Users</h4>
        </div>
        <p className="text-3xl font-bold">247</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          <h4 className="text-lg font-medium">Revenue</h4>
        </div>
        <p className="text-3xl font-bold">
          ${orderHistory.reduce((acc, order) => acc + order.total_amount, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Welcome, {profile?.full_name}</span>
        </div>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'orders'
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'stats'
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Statistics
          </button>
        </nav>
      </div>

      {activeTab === 'orders' ? renderOrders() : renderStats()}
    </div>
  );
}