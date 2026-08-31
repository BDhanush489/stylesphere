"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles, MessageCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const [sortBy, setSortBy] = useState("newest");
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (item) => {
    removeFromWishlist(item.id);
    toast.success(`${item.name} removed from wishlist`);
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
            <div className="p-3 bg-gray-900 rounded-2xl">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-500">Your curated collection of dream pieces</p>
        </div>

        {sortedItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6">Start adding items you love to see them here</p>
            <Link
              href="/products"
              className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
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
                    <Link href={`/products/${item.id}`} className="block w-full h-full">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <button
                      onClick={() => handleRemove(item)}
                      aria-label="Remove from wishlist"
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
                    </button>
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

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/try-on?product=${item.id}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium bg-gray-900 text-white hover:bg-black transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Try It On
                      </Link>
                      <Link
                        href={`/enquire?product=${item.id}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-900 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Enquire
                      </Link>
                    </div>
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
