"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function TShirtsDetailsPage() {
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
        const res = await fetch(`/api/tshirts/${id}`);
        if (!res.ok) throw new Error("T-Shirt not found");
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
    addToCart(product, selectedSize, "tshirt");
    toast.success("Added to bag!");
    setIsAddingToCart(false);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product, selectedSize, "tshirt");
    toast.success(added ? "Added to wishlist!" : "Removed from wishlist");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tshirts" className="hover:text-gray-700">T-Shirts</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <p className="text-gray-600">Premium Quality Cotton T-Shirt</p>

            {/* Price Section */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-semibold rounded">
                  ({discountPercent}% OFF)
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">SELECT SIZE</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-full focus:outline-none transition-colors duration-200 flex items-center justify-center font-medium ${
                      selectedSize === size
                        ? "border-pink-500 text-pink-500 bg-pink-50"
                        : "border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg ${
                  isAddingToCart
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700 text-white"
                }`}
              >
                {isAddingToCart ? "ADDING TO BAG..." : "ADD TO BAG"}
              </button>

              <div className="flex gap-4">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-1 border-2 font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center gap-2 ${
                    wishlisted
                      ? "border-pink-600 bg-pink-50 text-pink-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
                  {wishlisted ? "WISHLISTED" : "WISHLIST"}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg text-center"
                >
                  VIEW CART
                </Link>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">DELIVERY OPTIONS</h4>
              <p className="text-sm text-gray-700">Get it by Tomorrow, if ordered before 12:00 PM</p>
              <p className="text-sm text-gray-700">Pay on Delivery available</p>
              <p className="text-sm text-gray-700">Easy 30 days return available</p>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">PRODUCT DETAILS</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Premium quality cotton fabric</p>
                <p>• Regular fit for comfortable wear</p>
                <p>• Machine wash cold</p>
                <p>• Imported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
