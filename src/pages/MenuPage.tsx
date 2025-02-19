
import { Star, Plus } from "lucide-react";
import { CartItem, useCartStore } from "../store/useCartStore";


const menuItems = [
  {
    category: "Italian Favorites",
    items: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil, olive oil",
        price: 499,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
        rating: 4.8,
        restaurant_id: "1",
        restaurant_name: "Italian Bistro",
        estimated_time: 30,
      },
      {
        id: 2,
        name: "Pasta Carbonara",
        description: "Creamy sauce with pancetta, egg, parmesan",
        price: 599,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        rating: 4.7,
        restaurant_id: "1",
        restaurant_name: "Italian Bistro",
        estimated_time: 25,
      },
      {
        id: 3,
        name: "Lasagna",
        description: "Layered pasta with meat sauce and cheese",
        price: 699,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3",
        rating: 4.9,
        restaurant_id: "1",
        restaurant_name: "Italian Bistro",
        estimated_time: 40,
      },
    ],
  },
  {
    category: "Asian Delights",
    items: [
      {
        id: 4,
        name: "Sushi Roll Platter",
        description: "Assorted fresh sushi rolls, 12 pieces",
        price: 1199,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        rating: 4.9,
        restaurant_id: "2",
        restaurant_name: "Sushi Heaven",
        estimated_time: 45,
      },
      {
        id: 5,
        name: "Pad Thai",
        description: "Rice noodles with shrimp, tofu, peanuts",
        price: 499,
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
        rating: 4.6,
        restaurant_id: "2",
        restaurant_name: "Sushi Heaven",
        estimated_time: 35,
      },
      {
        id: 6,
        name: "Chicken Curry",
        description: "Aromatic curry with tender chicken",
        price: 599,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
        rating: 4.7,
        restaurant_id: "2",
        restaurant_name: "Sushi Heaven",
        estimated_time: 40,
      },
    ],
  },
];

function MenuPage() {
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    addItemToCart(item);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Our Menu</h2>

      {menuItems.map((category) => (
        <div key={category.category} className="mb-12">
          <h3 className="text-2xl font-bold mb-6">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white px-2 py-1 rounded-full shadow">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold">{item.name}</h4>
                    <span className="text-lg font-bold text-orange-600">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuPage;
