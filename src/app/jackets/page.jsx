'use client';

import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Filter, Grid3X3, Grid2X2, LayoutGrid, List, ChevronDown, ChevronUp, Star, Play, Sparkles, ChevronRight } from 'lucide-react';
import Link from "next/link";

export default function StylesphereJacketsPage() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid-4');
  const [sortBy, setSortBy] = useState('Featured');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [likedItems, setLikedItems] = useState(new Set());
  const [products, setProducts] = useState([]);

  // Jacket products data
  useEffect(() => {
    fetch("/api/jackets")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  const categories = [
    { name: "Bomber Jackets", count: 12 },
    { name: "Denim Jackets", count: 8 },
    { name: "Winter Coats", count: 15 },
    { name: "Blazers", count: 18 },
    { name: "Hoodies", count: 22 },
    { name: "Leather Jackets", count: 9 },
    { name: "Windbreakers", count: 6 }
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "Blue", "Navy", "Charcoal", "Grey", "Brown", "Green"];

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getDiscountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const getGridCols = () => {
    switch (viewMode) {
      case 'grid-1': return 'grid-cols-1';
      case 'grid-2': return 'grid-cols-1 md:grid-cols-2';
      case 'grid-4': return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3';
      case 'list': return 'grid-cols-1';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Filters and Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="lg:w-1/4">

            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between mb-6 shadow-sm"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <span className="flex items-center">
                <Filter className="w-5 h-5 mr-2 text-pink-600" />
                <span className="font-medium">Filters</span>
              </span>
              {isMobileFiltersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            <div className={`space-y-6 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Categories */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.name]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                          }
                        }}
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-purple-600 transition-colors">
                        {category.name} <span className="text-gray-400">({category.count})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">₹</span>
                      <input
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">₹</span>
                      <input
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* Size Filter */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`border-2 py-3 px-4 text-sm font-medium rounded-lg transition-all ${selectedSizes.includes(size)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                        }`}
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter(s => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-full hover:border-purple-500 transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Top Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">View:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${viewMode === 'grid-2' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setViewMode('grid-2')}
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${viewMode === 'grid-4' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setViewMode('grid-4')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${getGridCols()} gap-6`}>
              {products.map((product) => (
                <Link href={`/jackets/${product.id}`} key={product.id}>
                  <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center">
                          <span className="text-6xl">🧥</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            NEW
                          </span>
                        )}
                        {product.originalPrice > product.price && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleLike(product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${likedItems.has(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                          }`}
                      >
                        <Heart className="w-4 h-4" fill={likedItems.has(product.id) ? 'currentColor' : 'none'} />
                      </button>

                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-900">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-sm text-purple-600 font-medium">{product.category}</span>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{product.name}</h3>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xl text-gray-900">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-600">Available sizes:</span>
                        <div className="flex space-x-1">
                          {product.sizes.slice(0, 4).map((size, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              {/* <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Load More Products
              </button> */}
              <button
                className={`px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 bg-pink-600 active:bg-pink-500 text-white`}>
                Load More Products
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
// File Path: /app/jackets/page.jsx

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function JacketsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/jackets"); // GET request

//         if (!res.ok) {
//           throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
//         }

//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="p-8 text-center">Loading jackets...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Jackets Collection</h1>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">No jackets found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <div
//               key={product.id}
//               className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="relative h-80 w-full">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   sizes="(max-width: 640px) 100vw,
//                          (max-width: 768px) 50vw,
//                          (max-width: 1024px) 33vw,
//                          25vw"
//                   style={{ objectFit: "cover" }}
//                   className="rounded-t-lg"
//                   // 👇 Add priority to the first image above the fold
//                   priority={index === 0}
//                 />
//               </div>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold truncate">{product.name}</h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


