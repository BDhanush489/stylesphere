"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function ShirtDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/shirts/${id}`);
        if (!res.ok) throw new Error("Shirt not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    addToCart(product, selectedSize, "shirt");
    toast.success("Added to bag!");
    setIsAddingToCart(false);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product, selectedSize, "shirt");
    toast.success(added ? "Added to wishlist!" : "Removed from wishlist");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shirts" className="hover:text-gray-800">Shirts</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[550px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">Premium Cotton Shirt for Everyday Style</p>

            {/* Price */}
            <div className="flex items-center gap-3 border-y py-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-semibold rounded">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-full flex items-center justify-center font-medium transition-colors
                      ${selectedSize === size
                        ? "border-pink-600 bg-pink-50 text-pink-600"
                        : "border-gray-300 hover:border-pink-600 text-gray-700"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 rounded-lg font-semibold text-lg transition-colors
                  ${isAddingToCart
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700 text-white"}`}
              >
                {isAddingToCart ? "Adding..." : "Add to Bag"}
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`flex-1 border-2 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2
                  ${wishlisted
                    ? "border-pink-600 bg-pink-50 text-pink-600"
                    : "border-gray-300 hover:border-pink-600 hover:text-pink-600 text-gray-700"}`}
              >
                <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Delivery Options</h4>
              <p className="text-sm text-gray-700">✓ Get it by Tomorrow (Order before 12 PM)</p>
              <p className="text-sm text-gray-700">✓ Pay on Delivery Available</p>
              <p className="text-sm text-gray-700">✓ Easy 30 Days Return Policy</p>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Product Details</h4>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>100% Premium Cotton</li>
                <li>Comfortable Regular Fit</li>
                <li>Breathable & Lightweight</li>
                <li>Machine Wash Cold</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
