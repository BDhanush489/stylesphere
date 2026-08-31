"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const [sortBy, setSortBy] = useState("newest");
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (item) => {
    removeFromWishlist(item.id);
    toast.success(`${item.name} removed from wishlist`);
  };

  const handleAddToBag = (item) => {
    addToCart(item, item.selectedSize || "M", item.type);
    toast.success(`${item.name} added to your bag!`);
  };

  const sortedItems = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "newest":
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-500">Your curated collection of dream pieces</p>
        </div>

        {sortedItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6">Start adding items you love to see them here</p>
            <Link
              href="/"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map((item) => (
                <div
                  key={item.cartId}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative aspect-[3/4]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemove(item)}
                      aria-label="Remove from wishlist"
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
                    </button>
                    {item.originalPrice > item.price && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                    {item.selectedSize && (
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Size: {item.selectedSize}</p>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold text-gray-900">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToBag(item)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all bg-pink-500 text-white hover:bg-pink-600 shadow-sm hover:shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
