import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  restaurant_id: string;
  restaurant_name: string;
  estimated_time: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  estimatedDeliveryTime: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getRestaurantId: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      estimatedDeliveryTime: 0,
      addItem: (item) =>
        set((state) => {
          // Check if adding from a different restaurant
          const currentRestaurantId = get().getRestaurantId();
          if (currentRestaurantId && currentRestaurantId !== item.restaurant_id) {
            return state; // Don't add item from different restaurant
          }

          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              total: state.total + item.price,
              estimatedDeliveryTime: Math.max(state.estimatedDeliveryTime, item.estimated_time),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price,
            estimatedDeliveryTime: Math.max(state.estimatedDeliveryTime, item.estimated_time),
          };
        }),
      removeItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          return {
            items: state.items.filter((i) => i.id !== id),
            total: state.total - (item.price * item.quantity),
            estimatedDeliveryTime: state.items.length === 1 ? 0 : state.estimatedDeliveryTime,
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          const quantityDiff = quantity - item.quantity;
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: state.total + (item.price * quantityDiff),
            estimatedDeliveryTime: state.estimatedDeliveryTime,
          };
        }),
      clearCart: () =>
        set({
          items: [],
          total: 0,
          estimatedDeliveryTime: 0,
        }),
      getRestaurantId: () => {
        const state = get();
        return state.items.length > 0 ? state.items[0].restaurant_id : null;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);