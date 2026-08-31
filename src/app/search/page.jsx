"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, Star, SearchX } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const SOURCES = [
  { endpoint: "/api/shirts", basePath: "/shirts", type: "shirt", fallbackIcon: "👔" },
  { endpoint: "/api/tshirts", basePath: "/tshirts", type: "tshirt", fallbackIcon: "👕" },
  { endpoint: "/api/jackets", basePath: "/jackets", type: "jacket", fallbackIcon: "🧥" },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      SOURCES.map((source) =>
        fetch(source.endpoint)
          .then((res) => res.json())
          .then((data) =>
            (Array.isArray(data) ? data : []).map((product) => ({
              ...product,
              basePath: source.basePath,
              type: source.type,
              fallbackIcon: source.fallbackIcon,
            }))
          )
          .catch(() => [])
      )
    )
      .then((results) => setAllProducts(results.flat()))
      .finally(() => setIsLoading(false));
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin h-10 w-10 border-4 border-pink-500 border-t-transparent rounded-full" />
          </div>
        ) : !query ? (
          <p className="text-gray-600 mt-4">Type something in the search bar above to find products.</p>
        ) : results.length === 0 ? (
          <div className="text-center py-24">
            <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
            <p className="text-gray-600">Try searching for shirts, t-shirts, or jackets.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-8">{results.length} {results.length === 1 ? "result" : "results"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <Link href={`${product.basePath}/${product.id}`} key={`${product.basePath}-${product.id}`}>
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
                          <span className="text-6xl">{product.fallbackIcon}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product, undefined, product.type);
                        }}
                        aria-label="Toggle wishlist"
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                          isWishlisted(product.id) ? "bg-pink-600 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-pink-600 font-medium">{product.category}</span>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{product.name}</h3>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-gray-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
