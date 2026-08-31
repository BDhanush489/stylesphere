"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

  const gst = Math.round(cartTotal * 0.18);
  const total = cartTotal + gst;

  const handleBuy = async () => {
    const res = await fetch(`/api/payment?amount=${total}&name=Stylesphere Order`);
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Stylesphere",
      description: `Order of ${cart.length} items`,
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, cartItems: cart }),
        });

        const result = await verifyRes.json();
        if (result.success) {
          toast.success("Payment verified & successful!");
          clearCart();
        } else {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#db2777" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Shopping Cart</span>
          </nav>

          <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link
              href="/"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium text-sm hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartId} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">Size: {item.selectedSize}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-gray-900">₹{item.price?.toLocaleString()}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes (GST 18%)</span>
                  <span className="font-medium">₹{gst.toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleBuy}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg mb-4"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="w-full block text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
