"use client";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <a
              href="/shop"
              className="inline-block bg-[#FA6868] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#FA6868] mb-4">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity - 1,
                            )
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity + 1,
                            )
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (estimated)</span>
                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-[#FA6868]">
                        ${(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="/checkout"
                  className="block w-full bg-[#FA6868] text-white text-center px-6 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors mb-3"
                >
                  Proceed to Checkout
                </a>
                <a
                  href="/shop"
                  className="block w-full bg-gray-100 text-gray-700 text-center px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
