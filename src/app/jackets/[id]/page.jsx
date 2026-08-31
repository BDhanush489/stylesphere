"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function JacketPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/jackets/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 300));
    addToCart(product, selectedSize, "jacket");
    toast.success("Added to Bag");
    setIsAdding(false);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product, selectedSize, "jacket");
    toast.success(added ? "Added to Wishlist" : "Removed from Wishlist");
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/jackets" className="hover:text-gray-800">Jackets</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">Premium Quality Jacket</p>

            {/* Price */}
            <div className="flex items-center gap-3 border-y py-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition ${
                      selectedSize === s
                        ? "border-pink-500 bg-pink-50 text-pink-600"
                        : "border-gray-300 hover:border-pink-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  isAdding ? "bg-gray-400 text-white" : "bg-pink-600 hover:bg-pink-700 text-white"
                }`}
              >
                {isAdding ? "Adding..." : "Add to Bag"}
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-1 py-4 border-2 rounded-lg font-bold flex items-center justify-center gap-2 ${
                    wishlisted
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-bold text-center"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Extra Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>✔ Delivery by Tomorrow</p>
              <p>✔ Easy 30-day return</p>
              <p>✔ Pay on Delivery available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
