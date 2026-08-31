"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const onSale = product.originalPrice > product.price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product, undefined, product.category);
          }}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            wishlisted ? "bg-gray-900 text-white" : "bg-white/90 text-gray-700 hover:bg-white"
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
        </button>
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-900 text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
            New
          </span>
        )}
        {product.availability === "sold_out" && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-900 border border-gray-900 bg-white px-3 py-1">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[11px] uppercase tracking-wide text-gray-400">{product.brandName}</p>
        <h3 className="text-sm font-medium text-gray-900 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
          {onSale && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {product.availability === "made_to_order" && (
          <p className="text-[11px] text-amber-700 font-medium">Made to Order</p>
        )}
      </div>
    </Link>
  );
}
