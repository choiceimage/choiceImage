"use client";
import { useState } from "react";
import { Search, Package, CheckCircle, Truck, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const response = await fetch(
        `/api/orders?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError(
            "Order not found. Please check your order number and email.",
          );
        } else {
          setError("Failed to fetch order details. Please try again.");
        }
        return;
      }

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Track order error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case "paid":
      case "processing":
        return <Package className="w-6 h-6 text-blue-500" />;
      case "shipped":
        return <Truck className="w-6 h-6 text-purple-500" />;
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600">
            Enter your order number and email to view your order status
          </p>
        </div>

        {/* Track Order Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ORD-1234567890-XXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA6868] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA6868] focus:border-transparent"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FA6868] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                "Searching..."
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{orderData.order.order_number}
                  </h2>
                  <p className="text-gray-600">
                    Placed on{" "}
                    {new Date(orderData.order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(orderData.order.status)}`}
                >
                  {orderData.order.status.charAt(0).toUpperCase() +
                    orderData.order.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Customer Details
                  </h3>
                  <p className="text-gray-600">
                    {orderData.order.customer_name}
                  </p>
                  <p className="text-gray-600">
                    {orderData.order.customer_email}
                  </p>
                  {orderData.order.customer_phone && (
                    <p className="text-gray-600">
                      {orderData.order.customer_phone}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-gray-600">
                    {orderData.order.shipping_address}
                  </p>
                  {orderData.order.city && (
                    <p className="text-gray-600">{orderData.order.city}</p>
                  )}
                  {orderData.order.postal_code && (
                    <p className="text-gray-600">
                      {orderData.order.postal_code}
                    </p>
                  )}
                  {orderData.order.country && (
                    <p className="text-gray-600">{orderData.order.country}</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {orderData.order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × $
                          {parseFloat(item.product_price).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-[#FA6868]">
                        ${parseFloat(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#FA6868]">
                      ${parseFloat(orderData.order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Tracking
              </h2>
              <div className="space-y-6">
                {orderData.tracking.map((track, index) => (
                  <div key={track.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(track.status)}
                      {index !== orderData.tracking.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {track.status.replace("_", " ")}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(track.created_at).toLocaleString()}
                        </span>
                      </div>
                      {track.location && (
                        <p className="text-sm text-gray-600">
                          Location: {track.location}
                        </p>
                      )}
                      {track.notes && (
                        <p className="text-sm text-gray-600">{track.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            {orderData.payment && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {orderData.payment.payment_method?.replace("_", " ") ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold ${getStatusColor(orderData.payment.status)}`}
                    >
                      {orderData.payment.status.charAt(0).toUpperCase() +
                        orderData.payment.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-semibold text-gray-900">
                      ${parseFloat(orderData.payment.amount).toFixed(2)}
                    </p>
                  </div>
                  {orderData.payment.transaction_id && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Transaction ID
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {orderData.payment.transaction_id}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
