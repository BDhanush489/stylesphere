"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchX, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import BrandMark from "@/components/BrandMark";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    Promise.all([
      fetch(`/api/products?q=${encodeURIComponent(query)}&limit=60`).then((res) => res.json()),
      fetch("/api/brands").then((res) => res.json()),
    ])
      .then(([productData, brandData]) => {
        setProducts(productData.items || []);
        const q = query.toLowerCase();
        setBrands(
          (brandData || []).filter(
            (b) => b.name.toLowerCase().includes(q) || b.aesthetic.toLowerCase().includes(q)
          )
        );
      })
      .catch(() => {
        setProducts([]);
        setBrands([]);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const totalResults = useMemo(() => products.length + brands.length, [products, brands]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin h-10 w-10 border-4 border-gray-900 border-t-transparent rounded-full" />
          </div>
        ) : !query ? (
          <p className="text-gray-600 mt-4">Type something in the search bar above to find brands and products.</p>
        ) : totalResults === 0 ? (
          <div className="text-center py-24">
            <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600">Try a different brand, category, or product name.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-10">{totalResults} {totalResults === 1 ? "result" : "results"}</p>

            {brands.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">Brands</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/brands/${brand.slug}`}
                      className="flex items-center gap-4 border border-gray-200 hover:border-gray-900 p-4 transition-colors group"
                    >
                      <BrandMark brand={brand} size={48} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{brand.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{brand.aesthetic}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {products.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </section>
            )}
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
