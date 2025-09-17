// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ShirtsDetailsPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await fetch(`/api/shirts/${id}`);
//         if (!res.ok) throw new Error("Jacket not found");
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//     if (id) fetchProduct();
//   }, [id]);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <h2 className="text-xl font-semibold text-red-600">{error}</h2>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
//         <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-64 object-cover rounded-lg shadow-md"
//         />
//         <p className="mt-4 text-lg font-semibold text-green-600">
//           ₹{product.price}
//         </p>
//         <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
//         <p className="mt-2 text-sm text-gray-700">
//           Sizes: {product.sizes.join(", ")}
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ShirtsDetailsPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await fetch(`/api/shirts/${id}`);
//         if (!res.ok) throw new Error("Jacket not found");
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//     if (id) fetchProduct();
//   }, [id]);

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
//             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate discount percentage
//   const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="text-sm text-gray-500 mb-6">
//           <span>Home</span> <span className="mx-2">/</span>
//           <span>Clothing</span> <span className="mx-2">/</span>
//           <span>Shirts</span> <span className="mx-2">/</span>
//           <span className="text-gray-800">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images Section */}
//           <div className="space-y-4">
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             {/* Thumbnail images (placeholder for multiple images) */}
//             <div className="flex gap-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-20 h-20 bg-white rounded-lg border-2 border-transparent hover:border-pink-500 cursor-pointer overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={`${product.name} view ${i}`}
//                     className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="space-y-6">
//             {/* Product Title and Brand */}
//             <div>
//               <h2 className="text-sm text-gray-500 font-medium mb-2">BRAND NAME</h2>
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
//               <p className="text-gray-600 mt-2">Premium Quality Cotton Shirt</p>
//             </div>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 <div className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
//                   <span>4.3</span>
//                   <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
//                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
//                   </svg>
//                 </div>
//                 <span className="text-gray-600 text-sm">|</span>
//                 <span className="text-gray-600 text-sm">2.1k Reviews</span>
//               </div>
//             </div>

//             {/* Price Section */}
//             <div className="border-t border-b border-gray-200 py-6">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//                 <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                 <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-semibold rounded">
//                   ({discountPercent}% OFF)
//                 </span>
//               </div>
//               <p className="text-sm text-green-600 font-medium">inclusive of all taxes</p>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">SELECT SIZE</h3>
//               <div className="flex flex-wrap gap-3">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     className="w-12 h-12 border-2 border-gray-300 rounded-full hover:border-pink-500 focus:border-pink-500 focus:outline-none transition-colors duration-200 flex items-center justify-center font-medium text-gray-700 hover:text-pink-500"
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <button className="text-pink-600 text-sm font-medium mt-2 hover:underline">
//                 SIZE CHART →
//               </button>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4 pt-6">
//               <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
//                 ADD TO BAG
//               </button>
//               <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
//                 WISHLIST
//               </button>
//             </div>

//             {/* Delivery Info */}
//             <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//               <h4 className="font-semibold text-gray-900">DELIVERY OPTIONS</h4>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
//                 </svg>
//                 <span className="text-sm text-gray-700">Get it by Tomorrow, if ordered before 12:00 PM</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
//                 </svg>
//                 <span className="text-sm text-gray-700">Pay on Delivery available</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
//                 </svg>
//                 <span className="text-sm text-gray-700">Easy 30 days return available</span>
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="border-t border-gray-200 pt-6">
//               <h4 className="font-semibold text-gray-900 mb-4">PRODUCT DETAILS</h4>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>• Premium quality cotton fabric</p>
//                 <p>• Regular fit for comfortable wear</p>
//                 <p>• Machine wash cold</p>
//                 <p>• Imported</p>
//               </div>
//             </div>

//             {/* Material & Care */}
//             <div className="border-t border-gray-200 pt-6">
//               <h4 className="font-semibold text-gray-900 mb-4">MATERIAL & CARE</h4>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>• 100% Cotton</p>
//                 <p>• Machine Wash</p>
//                 <p>• Do Not Bleach</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ShirtsDetailsPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await fetch(`/api/shirts/${id}`);
//         if (!res.ok) throw new Error("Shirt not found");
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//     if (id) fetchProduct();
//   }, [id]);

//   const addToCart = (product, selectedSize) => {
//     try {
//       const existingCart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');

//       const cartId = `${product.id}-${selectedSize}`;
//       const existingItemIndex = existingCart.findIndex(item => item.cartId === cartId);

//       if (existingItemIndex > -1) {
//         // If item exists, increase quantity
//         existingCart[existingItemIndex].quantity += 1;
//       } else {
//         // Add new item to cart
//         const cartItem = {
//           id: product.id,
//           cartId: cartId,
//           name: product.name,
//           price: product.price,
//           originalPrice: product.originalPrice,
//           image: product.image,
//           selectedSize: selectedSize,
//           quantity: 1,
//           type: 'shirt' // Add type to distinguish from jackets
//         };
//         existingCart.push(cartItem);
//       }

//       localStorage.setItem('shopping_cart', JSON.stringify(existingCart));
//       return true;
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       return false;
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!selectedSize) {
//       alert("Please select a size");
//       return;
//     }

//     setIsAddingToCart(true);

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     const success = addToCart(product, selectedSize);

//     if (success) {
//       alert("Product added to cart!");
//     } else {
//       alert("Error adding product to cart. Please try again.");
//     }

//     setIsAddingToCart(false);
//   };

//   const AddToWishlist = (product, selectedSize) => {
//     try {
//       // ✅ Always get current wishlist without overwriting
//       const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//       const cartId = `${product.id}-${selectedSize}`;

//       // ✅ Check if this specific product+size combo already exists
//       const alreadyExists = existingWishlist.some(item => item.cartId === cartId);

//       if (!alreadyExists) {
//         const wishlistItem = {
//           id: product.id,
//           cartId: cartId,
//           name: product.name,
//           price: product.price,
//           originalPrice: product.originalPrice,
//           image: product.image,
//           selectedSize: selectedSize,
//           quantity: 1,
//           type: "tshirt", // distinguish from other categories
//           dateAdded: new Date().toISOString(), // for sorting
//         };

//         existingWishlist.push(wishlistItem);
//         localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//         return true; // success
//       }

//       // ✅ If already exists, just return false (no duplicate added)
//       return false;
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       return false;
//     }
//   };

//   const handleAddToWishlist = async () => {
//     if (!selectedSize) {
//       alert("Please select a size");
//       return;
//     }

//     setIsAddingToCart(true);

//     await new Promise(resolve => setTimeout(resolve, 500));

//     const success = AddToWishlist(product, selectedSize);

//     if (success) {
//       alert("Product added to wishlist!");
//     } else {
//       alert("Error adding product to wishlist. Please try again.");
//     }

//     setIsAddingToCart(false);
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
//             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate discount percentage
//   const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="text-sm text-gray-500 mb-6">
//           <Link href="/" className="hover:text-gray-700">Home</Link>
//           <span className="mx-2">/</span>
//           <span>Clothing</span> <span className="mx-2">/</span>
//           <span>Shirts</span> <span className="mx-2">/</span>
//           <span className="text-gray-800">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images Section */}
//           <div className="space-y-4">
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             {/* Thumbnail images (placeholder for multiple images) */}
//             <div className="flex gap-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-20 h-20 bg-white rounded-lg border-2 border-transparent hover:border-pink-500 cursor-pointer overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={`${product.name} view ${i}`}
//                     className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="space-y-6">
//             {/* Product Title and Brand */}
//             <div>
//               <h2 className="text-sm text-gray-500 font-medium mb-2">BRAND NAME</h2>
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
//               <p className="text-gray-600 mt-2">Premium Quality Cotton Shirt</p>
//             </div>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 <div className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
//                   <span>4.3</span>
//                   <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
//                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                   </svg>
//                 </div>
//                 <span className="text-gray-600 text-sm">|</span>
//                 <span className="text-gray-600 text-sm">2.1k Reviews</span>
//               </div>
//             </div>

//             {/* Price Section */}
//             <div className="border-t border-b border-gray-200 py-6">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//                 <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                 <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-semibold rounded">
//                   ({discountPercent}% OFF)
//                 </span>
//               </div>
//               <p className="text-sm text-green-600 font-medium">inclusive of all taxes</p>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">SELECT SIZE</h3>
//               <div className="flex flex-wrap gap-3">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`w-12 h-12 border-2 rounded-full focus:outline-none transition-colors duration-200 flex items-center justify-center font-medium ${selectedSize === size
//                       ? 'border-pink-500 text-pink-500 bg-pink-50'
//                       : 'border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500'
//                       }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <button className="text-pink-600 text-sm font-medium mt-2 hover:underline">
//                 SIZE CHART →
//               </button>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4 pt-6">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isAddingToCart}
//                 className={`w-full font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg ${isAddingToCart
//                   ? 'bg-gray-400 text-white cursor-not-allowed'
//                   : 'bg-pink-600 hover:bg-pink-700 text-white'
//                   }`}
//               >
//                 {isAddingToCart ? 'ADDING TO BAG...' : 'ADD TO BAG'}
//               </button>

//               <div className="flex gap-4">
//                 <button
//                   onClick={handleAddToWishlist}
//                   className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
//                   WISHLIST
//                 </button>
//                 <Link
//                   href="/cart"
//                   className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg text-center"
//                 >
//                   VIEW CART
//                 </Link>
//               </div>
//             </div>

//             {/* Delivery Info */}
//             <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//               <h4 className="font-semibold text-gray-900">DELIVERY OPTIONS</h4>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-sm text-gray-700">Get it by Tomorrow, if ordered before 12:00 PM</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                 </svg>
//                 <span className="text-sm text-gray-700">Pay on Delivery available</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 <span className="text-sm text-gray-700">Easy 30 days return available</span>
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="border-t border-gray-200 pt-6">
//               <h4 className="font-semibold text-gray-900 mb-4">PRODUCT DETAILS</h4>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>• Premium quality cotton fabric</p>
//                 <p>• Regular fit for comfortable wear</p>
//                 <p>• Breathable and comfortable</p>
//                 <p>• Machine wash cold</p>
//                 <p>• Imported</p>
//               </div>
//             </div>

//             {/* Material & Care */}
//             <div className="border-t border-gray-200 pt-6">
//               <h4 className="font-semibold text-gray-900 mb-4">MATERIAL & CARE</h4>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>• 100% Cotton</p>
//                 <p>• Machine Wash Cold</p>
//                 <p>• Do Not Bleach</p>
//                 <p>• Tumble Dry Low</p>
//                 <p>• Iron on Medium Heat</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ShirtDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const { addToCart } = useCart();

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

  // --- CART FUNCTIONS ---
  const addToBag = (product, size) => {
    const existingCart = JSON.parse(localStorage.getItem("shopping_cart") || "[]");
    const cartId = `${product.id}-${size}`;
    const existingItemIndex = existingCart.findIndex(item => item.cartId === cartId);

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        cartId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        selectedSize: size,
        quantity: 1,
        type: "shirt",
      });
    }

    localStorage.setItem("shopping_cart", JSON.stringify(existingCart));
    return true;
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    addToCart(product, selectedSize);
    const success = addToBag(product, selectedSize);
    toast.success(success ? "Product added to cart!" : "Error adding to cart.");
    setIsAddingToCart(false);
  };

  // --- WISHLIST FUNCTIONS ---
  const addToWishlist = (product, size) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const cartId = `${product.id}-${size}`;
    const alreadyExists = existingWishlist.some(item => item.cartId === cartId);

    if (!alreadyExists) {
      existingWishlist.push({
        id: product.id,
        cartId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        selectedSize: size,
        quantity: 1,
        type: "shirt",
        dateAdded: new Date().toISOString(),
      });
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      return true;
    }
    return false;
  };

  const handleAddToWishlist = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsAddingToWishlist(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const success = addToWishlist(product, selectedSize);
    toast.success(success ? "Added to wishlist!" : "Already in wishlist.");
    setIsAddingToWishlist(false);
  };

  // --- LOADING / ERROR STATES ---
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
                {product.sizes.map(size => (
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
              <button className="text-pink-600 text-sm mt-2 hover:underline">View Size Chart →</button>
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
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
                className={`flex-1 border-2 py-3 rounded-lg font-semibold text-lg transition-colors
                  ${isAddingToWishlist
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "border-gray-300 hover:border-pink-600 hover:text-pink-600 text-gray-700"}`}
              >
                {isAddingToWishlist ? "Adding..." : "Wishlist"}
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
