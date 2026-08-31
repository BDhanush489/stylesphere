"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "shirts", label: "Shirts" },
  { value: "tshirts", label: "T-Shirts" },
  { value: "jackets", label: "Jackets" },
];
const PAGE_SIZE = 24;

function ProductsCatalog() {
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [brands, setBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [draftPriceRange, setDraftPriceRange] = useState([0, 12000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then(setBrands)
      .catch(() => setBrands([]));
  }, []);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
    if (appliedPriceRange) {
      params.set("minPrice", appliedPriceRange[0]);
      params.set("maxPrice", appliedPriceRange[1]);
    }
    if (onlyOnSale) params.set("onSale", "true");
    if (onlyInStock) params.set("inStockOnly", "true");
    if (sortBy) params.set("sort", sortBy);
    params.set("limit", String(visibleCount));
    return params.toString();
  }, [category, brand, selectedSizes, appliedPriceRange, onlyOnSale, onlyInStock, sortBy, visibleCount]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products?${queryString}`)
      .then((res) => res.json())
      .then(({ items, total: t }) => {
        setProducts(items || []);
        setTotal(t || 0);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [queryString]);

  // Any filter change other than "load more" should reset pagination.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, brand, selectedSizes, appliedPriceRange, onlyOnSale, onlyInStock, sortBy]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-8">Shop All Products</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters */}
          <div className="lg:w-1/4">
            <button
              className="lg:hidden w-full border border-gray-300 rounded p-3 flex items-center justify-between mb-6"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <span className="flex items-center gap-2 font-medium">
                <Filter className="w-4 h-4" /> Filters
              </span>
              {isMobileFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div className={`space-y-8 ${isMobileFiltersOpen ? "block" : "hidden lg:block"}`}>
              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((c) => (
                    <label key={c.value} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="category"
                        checked={category === c.value}
                        onChange={() => setCategory(c.value)}
                        className="text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-gray-700">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Brand</h3>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`border py-2 text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-300 text-gray-700 hover:border-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="number"
                    value={draftPriceRange[0]}
                    onChange={(e) => setDraftPriceRange([Number(e.target.value) || 0, draftPriceRange[1]])}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    type="number"
                    value={draftPriceRange[1]}
                    onChange={(e) => setDraftPriceRange([draftPriceRange[0], Number(e.target.value) || 0])}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                  />
                </div>
                <button
                  onClick={() => setAppliedPriceRange(draftPriceRange)}
                  className="w-full bg-gray-900 text-white py-2 text-sm font-medium hover:bg-black"
                >
                  Apply
                </button>
                {appliedPriceRange && (
                  <button
                    onClick={() => setAppliedPriceRange(null)}
                    className="w-full text-xs text-gray-500 hover:text-gray-900 mt-2"
                  >
                    Clear price filter
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Availability</h3>
                <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                  <input type="checkbox" checked={onlyOnSale} onChange={(e) => setOnlyOnSale(e.target.checked)} />
                  <span className="text-gray-700">On sale</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} />
                  <span className="text-gray-700">In stock only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{total} {total === 1 ? "item" : "items"}</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-24">
                <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 border border-gray-100">
                <p className="text-gray-600">No products match your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
                {visibleCount < total && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="border-2 border-gray-900 text-gray-900 px-8 py-3 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      Load More
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

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsCatalog />
    </Suspense>
  );
}
