"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sliders]);

  const fetchData = async () => {
    try {
      const [productsRes, slidersRes] = await Promise.all([
        fetch("/api/products?featured=true"),
        fetch("/api/homepage?section=slider"),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setFeaturedProducts(data.products.slice(0, 3));
      }

      if (slidersRes.ok) {
        const data = await slidersRes.json();
        setSliders(data.content);
      }

      const allProductsRes = await fetch("/api/products");
      if (allProductsRes.ok) {
        const data = await allProductsRes.json();
        setAllProducts(data.products.slice(0, 8));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#FA6868] to-[#91C6BC] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Capture Your Perfect Moments
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Professional photography services for every occasion
          </p>
          <a
            href="/shop"
            className="inline-flex items-center bg-white text-[#FA6868] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Explore Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Image Slider */}
      {sliders.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              {sliders.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-xl mb-6">{slide.subtitle}</p>
                      {slide.button_text && (
                        <a
                          href={slide.link_url || "/shop"}
                          className="inline-block bg-[#FA6868] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors"
                        >
                          {slide.button_text}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular photography packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.sale_price && (
                    <span className="absolute top-4 right-4 bg-[#91C6BC] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      {product.sale_price ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-[#FA6868]">
                            ${parseFloat(product.sale_price).toFixed(2)}
                          </span>
                          <span className="text-gray-400 line-through">
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-[#FA6868]">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#FA6868] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#e85555] transition-colors whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Services
            </h2>
            <p className="text-xl text-gray-600">
              Explore our complete range of photography services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#FA6868]">
                      $
                      {parseFloat(product.sale_price || product.price).toFixed(
                        2,
                      )}
                    </span>
                    <a
                      href={`/product/${product.id}`}
                      className="text-[#91C6BC] hover:text-[#7ab0a6] font-semibold text-sm"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/shop"
              className="inline-flex items-center bg-[#FA6868] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FA6868] to-[#91C6BC] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Capture Your Story?
          </h2>
          <p className="text-xl mb-8">
            Book a session today and let us create beautiful memories for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-[#FA6868] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Services
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FA6868] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
