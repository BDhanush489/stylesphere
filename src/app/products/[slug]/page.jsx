"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Heart, Share2, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import Product360Viewer from "@/components/Product360Viewer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

const AVAILABILITY_LABEL = {
  in_stock: "In Stock",
  made_to_order: "Made to Order",
  sold_out: "Sold Out",
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      // user cancelled share sheet; no-op
    }
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product, selectedSize, product.category);
    toast.success(added ? "Added to wishlist!" : "Removed from wishlist");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const onSale = product.originalPrice > product.price;
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/brands/${product.brandSlug}`} className="hover:text-gray-900">{product.brandName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-gray-900">{product.categoryLabel}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Gallery */}
          <div>
            <Product360Viewer images={product.images} alt={product.name} />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Link href={`/brands/${product.brandSlug}`} className="text-sm uppercase tracking-wide text-gray-500 hover:text-gray-900">
                {product.brandName}
              </Link>
              <h1 className="font-display text-3xl font-semibold text-gray-900 mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
              {onSale && <span className="text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
              <span
                className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 ${
                  product.availability === "in_stock"
                    ? "bg-green-50 text-green-700"
                    : product.availability === "made_to_order"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {AVAILABILITY_LABEL[product.availability]}
              </span>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                      selectedSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <dl className="grid grid-cols-2 gap-y-2 text-sm border-t border-b border-gray-200 py-4">
              <dt className="text-gray-500">Material</dt>
              <dd className="text-gray-900">{product.material}</dd>
              <dt className="text-gray-500">Fit</dt>
              <dd className="text-gray-900">{product.fit}</dd>
              <dt className="text-gray-500">Color</dt>
              <dd className="text-gray-900">{product.color}</dd>
              <dt className="text-gray-500">Rating</dt>
              <dd className="text-gray-900">{product.rating} ({product.reviews} reviews)</dd>
            </dl>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/try-on?product=${product.slug}`}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 transition-colors"
              >
                <Sparkles className="w-4 h-4" /> Try It On
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/enquire?product=${product.slug}`}
                  className="flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold py-3 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire
                </Link>
                <Link
                  href={`/enquire?product=${product.slug}&intent=availability`}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-3 hover:border-gray-900 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Check Availability
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex items-center justify-center gap-2 border-2 font-semibold py-3 transition-colors ${
                    wishlisted ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 text-gray-700 hover:border-gray-900"
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} /> {wishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-3 hover:border-gray-900 transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 pt-2">
              Available at our showroom or by enquiry. Visit our <Link href="/contact" className="underline hover:text-gray-900">store page</Link> for hours and location.
            </p>
          </div>
        </div>

        {/* Related */}
        {product.related?.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {product.related.map((related) => (
                <ProductCard key={related.slug} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
