"use client";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FA6868]">PhotoPro</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Shop
            </a>
            <a
              href="/workshops"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Workshops
            </a>
            <a
              href="/courses"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Courses
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Contact
            </a>
            <a
              href="/track-order"
              className="text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Track Order
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#FA6868] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FA6868] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <a
              href="/"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Shop
            </a>
            <a
              href="/workshops"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Workshops
            </a>
            <a
              href="/courses"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Courses
            </a>
            <a
              href="/about"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Contact
            </a>
            <a
              href="/track-order"
              className="block text-gray-700 hover:text-[#FA6868] transition-colors"
            >
              Track Order
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
