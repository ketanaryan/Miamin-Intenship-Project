import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useOrderStore } from '../store/useOrderStore';
import { CreditCard, MapPin, Clock } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, estimatedDeliveryTime, clearCart } = useCartStore();
  const { profile } = useAuthStore();
  const { createOrder } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(profile?.address || '');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total * 100 }), // Convert to cents
      });

      const { clientSecret } = await response.json();

      // Handle payment with Stripe
      // This would be implemented with Stripe Elements

      // Create order in database
      await createOrder({
        user_id: profile.id,
        restaurant_id: items[0].restaurant_id,
        total_amount: total,
        delivery_address: deliveryAddress,
        delivery_instructions: deliveryInstructions,
        estimated_delivery_time: new Date(Date.now() + estimatedDeliveryTime * 60000).toISOString(),
        items: items.map(item => ({
          menu_item_id: item.id.toString(),
          quantity: item.quantity,
          unit_price: item.price
        }))
      });

      clearCart();
      // Navigate to order confirmation
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4 mr-2" />
                Estimated delivery: {estimatedDeliveryTime} minutes
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Delivery Address
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Delivery Instructions (Optional)
              </label>
              <textarea
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Card Details
              </label>
              {/* Stripe Elements would be integrated here */}
              <div className="border rounded-lg p-4">
                Stripe Elements Placeholder
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}