"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Heart, Filter, Grid3X3, Grid2X2, List, ChevronDown, ChevronUp, Star } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PAGE_SIZE = 24;

export default function ProductListingPage({ apiEndpoint, basePath, type, fallbackIcon = "🛍️", pageTitle }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid-4");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [draftPriceRange, setDraftPriceRange] = useState([0, 10000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    setIsLoading(true);
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [apiEndpoint]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const getDiscountPercentage = (original, current) =>
    Math.round(((original - current) / original) * 100);

  const getGridCols = () => {
    switch (viewMode) {
      case "grid-2": return "grid-cols-1 md:grid-cols-2";
      case "list": return "grid-cols-1";
      default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (appliedPriceRange) {
      list = list.filter(
        (p) => p.price >= appliedPriceRange[0] && p.price <= appliedPriceRange[1]
      );
    }
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }
    if (onlyOnSale) {
      list = list.filter((p) => p.originalPrice > p.price);
    }

    switch (sortBy) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Best Rated":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest First":
        list.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      default:
        break;
    }

    return list;
  }, [products, appliedPriceRange, selectedSizes, onlyInStock, onlyOnSale, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {pageTitle && (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{pageTitle}</h1>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
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

            <div className={`space-y-6 ${isMobileFiltersOpen ? "block" : "hidden lg:block"}`}>
              {/* Price Range */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">₹</span>
                      <input
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        value={draftPriceRange[0]}
                        onChange={(e) => setDraftPriceRange([Number(e.target.value) || 0, draftPriceRange[1]])}
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">₹</span>
                      <input
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        value={draftPriceRange[1]}
                        onChange={(e) => setDraftPriceRange([draftPriceRange[0], Number(e.target.value) || 0])}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setAppliedPriceRange(draftPriceRange)}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-all"
                  >
                    Apply Filter
                  </button>
                  {appliedPriceRange && (
                    <button
                      onClick={() => setAppliedPriceRange(null)}
                      className="w-full text-sm text-gray-500 hover:text-pink-600"
                    >
                      Clear price filter
                    </button>
                  )}
                </div>
              </div>

              {/* Size Filter */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      className={`border-2 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
                        selectedSizes.includes(size)
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-pink-500"
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Availability</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="ml-3 text-gray-700">In stock only</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyOnSale}
                      onChange={(e) => setOnlyOnSale(e.target.checked)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="ml-3 text-gray-700">On sale</span>
                  </label>
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
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-pink-600 text-white" : "hover:bg-gray-100"}`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${viewMode === "grid-2" ? "bg-pink-600 text-white" : "hover:bg-gray-100"}`}
                    onClick={() => setViewMode("grid-2")}
                    aria-label="2-column grid"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${viewMode === "grid-4" ? "bg-pink-600 text-white" : "hover:bg-gray-100"}`}
                    onClick={() => setViewMode("grid-4")}
                    aria-label="3-column grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500 hidden sm:inline">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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

            {isLoading ? (
              <div className="flex justify-center py-24">
                <div className="animate-spin h-10 w-10 border-4 border-pink-500 border-t-transparent rounded-full" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-600 text-lg">No products match your filters.</p>
              </div>
            ) : (
              <>
                <div className={`grid ${getGridCols()} gap-6`}>
                  {visibleProducts.map((product) => (
                    <Link href={`${basePath}/${product.id}`} key={product.id}>
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
                        <div className="relative overflow-hidden">
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center">
                              <span className="text-6xl">{fallbackIcon}</span>
                            </div>
                          </div>

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

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product, undefined, type);
                            }}
                            aria-label="Toggle wishlist"
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                              isWishlisted(product.id)
                                ? "bg-pink-600 text-white"
                                : "bg-white/80 text-gray-600 hover:bg-white"
                            }`}
                          >
                            <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                          </button>

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
                            <span className="text-sm text-pink-600 font-medium">{product.category}</span>
                          </div>

                          <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{product.name}</h3>

                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xl text-gray-900">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Available sizes:</span>
                            <div className="flex space-x-1">
                              {product.sizes?.slice(0, 4).map((size) => (
                                <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {visibleCount < filteredProducts.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-all transform hover:scale-105"
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
