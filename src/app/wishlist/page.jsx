// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Heart, ShoppingBag, Filter, Grid, List, Star, Trash2, Share2, Eye } from 'lucide-react';

// const WishlistPage = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [notification, setNotification] = useState('');

//   const [wishlistItems, setWishlistItems] = useState([

//   ]);

//   // Sample product data for demo
//   const sampleProducts = [

//   ];

//   // Add to wishlist functionality
//   const handleAddToWishlist = (product) => {
//     // Check if item already exists in wishlist
//     const existsInWishlist = wishlistItems.some(item => item.id === product.id);

//     if (existsInWishlist) {
//       showNotification(`${product.name} is already in your wishlist!`, 'warning');
//       return;
//     }

//     // Add current date
//     const newItem = {
//       ...product,
//       dateAdded: new Date().toISOString().split('T')[0]
//     };

//     setWishlistItems(prev => [newItem, ...prev]);
//     showNotification(`${product.name} added to your wishlist!`, 'success');
//   };

//   // Remove from wishlist functionality
//   const removeFromWishlist = (id) => {
//     const item = wishlistItems.find(item => item.id === id);
//     setWishlistItems(prev => prev.filter(item => item.id !== id));
//     if (item) {
//       showNotification(`${item.name} removed from wishlist`, 'info');
//     }
//   };

//   // Add to bag functionality
//   const addToBag = (item) => {
//     showNotification(`${item.name} added to your bag!`, 'success');
//     console.log('Added to bag:', item.name);
//   };

//   // Notification system
//   const showNotification = (message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(''), 3000);
//   };

//   // Check if item is in wishlist
//   const isInWishlist = (productId) => {
//     return wishlistItems.some(item => item.id === productId);
//   };

//   const filteredItems = wishlistItems.filter(item => 
//     filterCategory === 'all' || item.category === filterCategory
//   );

//   const sortedItems = [...filteredItems].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       case 'newest':
//         return new Date(b.dateAdded) - new Date(a.dateAdded);
//       case 'oldest':
//         return new Date(a.dateAdded) - new Date(b.dateAdded);
//       default:
//         return 0;
//     }
//   });

//   const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
//   const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Notification */}
//       {notification && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
//           notification.type === 'success' ? 'bg-green-500 border-green-600 text-white' :
//           notification.type === 'warning' ? 'bg-yellow-500 border-yellow-600 text-white' :
//           notification.type === 'error' ? 'bg-red-500 border-red-600 text-white' :
//           'bg-blue-500 border-blue-600 text-white'
//         }`}>
//           {notification.message}
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 mb-6">
//             <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
//               <Heart className="w-8 h-8 text-white fill-current" />
//             </div>
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               My Wishlist
//             </h1>
//           </div>
//           <p className="text-gray-400 text-xl mb-8">Your curated collection of dream pieces</p>

//           {/* Stats */}
//           <div className="flex justify-center gap-6 mb-8">
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
//               <div className="text-2xl font-bold text-white">{wishlistItems.length}</div>
//               <div className="text-gray-300 text-sm">Items</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
//               <div className="text-2xl font-bold text-white">₹{totalValue.toLocaleString()}</div>
//               <div className="text-gray-300 text-sm">Total Value</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
//               <div className="text-2xl font-bold text-green-400">₹{totalSavings.toLocaleString()}</div>
//               <div className="text-gray-300 text-sm">Savings</div>
//             </div>
//           </div>
//         </div>

//         {/* Demo Section - Add to Wishlist */}
//         <div className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
//           <h3 className="text-lg font-semibold text-white mb-4">Demo: Add Items to Wishlist</h3>
//           <p className="text-gray-300 mb-6">Try adding these sample products to your wishlist:</p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {sampleProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-32 object-cover rounded-lg mb-3"
//                 />
//                 <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
//                 <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
//                 <p className="font-semibold text-gray-900 mb-3">₹{product.price.toLocaleString()}</p>

//                 <button
//                   onClick={() => handleAddToWishlist(product)}
//                   disabled={isInWishlist(product.id)}
//                   className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
//                     isInWishlist(product.id)
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-md hover:shadow-lg'
//                   }`}
//                 >
//                   <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? '' : 'hover:fill-current'}`} />
//                   {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Filters and Controls */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <Filter className="w-5 h-5 text-gray-300" />
//               <select 
//                 value={filterCategory}
//                 onChange={(e) => setFilterCategory(e.target.value)}
//                 className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="all">All Categories</option>
//                 <option value="dresses">Dresses</option>
//                 <option value="tops">Tops</option>
//                 <option value="pants">Pants</option>
//                 <option value="skirts">Skirts</option>
//                 <option value="outerwear">Outerwear</option>
//                 <option value="shoes">Shoes</option>
//               </select>

//               <select 
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white/20 text-gray-300 hover:bg-white/30'}`}
//               >
//                 <Grid className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white/20 text-gray-300 hover:bg-white/30'}`}
//               >
//                 <List className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Wishlist Items */}
//         {sortedItems.length === 0 ? (
//           <div className="text-center py-16">
//             <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
//             <p className="text-gray-400">Start adding items you love to see them here</p>
//           </div>
//         ) : (
//           <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
//             {sortedItems.map((item) => (
//               <div key={item.id} className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 ${viewMode === 'list' ? 'flex' : ''}`}>
//                 <div className={`relative ${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'aspect-[3/4]'}`}>
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                   />
//                   {!item.inStock && (
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                       <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                         Out of Stock
//                       </span>
//                     </div>
//                   )}
//                   <div className="absolute top-2 right-2 flex gap-1">
//                     <button
//                       onClick={() => removeFromWishlist(item.id)}
//                       className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
//                     >
//                       <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
//                     </button>
//                   </div>
//                   {item.originalPrice > item.price && (
//                     <div className="absolute top-2 left-2">
//                       <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                         {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-4 flex-1">
//                   <div className="mb-2">
//                     <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
//                       {item.name}
//                     </h3>
//                     <p className="text-gray-500 text-xs uppercase tracking-wider">{item.brand}</p>
//                   </div>

//                   <div className="flex items-center gap-1 mb-3">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star 
//                           key={i} 
//                           className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-500 text-xs">({item.reviews})</span>
//                   </div>

//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-lg font-semibold text-gray-900">₹{item.price.toLocaleString()}</span>
//                     {item.originalPrice > item.price && (
//                       <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => addToBag(item)}
//                       disabled={!item.inStock}
//                       className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
//                         item.inStock
//                           ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       <ShoppingBag className="w-4 h-4" />
//                       {viewMode === 'list' ? (item.inStock ? 'Add to Bag' : 'Out of Stock') : 'Add'}
//                     </button>
//                     <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:shadow-md border border-gray-200">
//                       <Eye className="w-4 h-4 text-gray-600 hover:text-gray-800" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Heart, ShoppingBag, Filter, Grid, List, Star, Trash2, Eye } from 'lucide-react';

// const WishlistPage = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [notification, setNotification] = useState('');
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // ✅ Load wishlist from localStorage
//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     setWishlistItems(storedWishlist);
//   }, []);

//   // ✅ Save to localStorage whenever wishlist changes
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   // Remove from wishlist functionality
//   const removeFromWishlist = (id) => {
//     const updated = wishlistItems.filter(item => item.id !== id);
//     setWishlistItems(updated);
//     localStorage.setItem('wishlist', JSON.stringify(updated));
//     showNotification(`Item removed from wishlist`, 'info');
//   };

//   // Add to bag functionality
//   const addToBag = (item) => {
//     showNotification(`${item.name} added to your bag!`, 'success');
//     console.log('Added to bag:', item.name);
//   };

//   // Notification system
//   const showNotification = (message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(''), 3000);
//   };

//   const filteredItems = wishlistItems.filter(item => 
//     filterCategory === 'all' || item.type === filterCategory
//   );

//   const sortedItems = [...filteredItems].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       case 'newest':
//         return new Date(b.dateAdded || Date.now()) - new Date(a.dateAdded || Date.now());
//       case 'oldest':
//         return new Date(a.dateAdded || Date.now()) - new Date(b.dateAdded || Date.now());
//       default:
//         return 0;
//     }
//   });

//   const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
//   const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Notification */}
//       {notification && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
//           notification.type === 'success' ? 'bg-green-500 border-green-600 text-white' :
//           notification.type === 'warning' ? 'bg-yellow-500 border-yellow-600 text-white' :
//           notification.type === 'error' ? 'bg-red-500 border-red-600 text-white' :
//           'bg-blue-500 border-blue-600 text-white'
//         }`}>
//           {notification.message}
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 mb-6">
//             <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
//               <Heart className="w-8 h-8 text-white fill-current" />
//             </div>
//             <h1 className="text-5xl font-bold bg-gray-300 bg-clip-text text-transparent">
//               My Wishlist
//             </h1>
//           </div>
//           <p className="text-gray-400 text-xl mb-8">Your curated collection of dream pieces</p>


//         </div>

//         {/* ✅ Wishlist Items */}
//         {sortedItems.length === 0 ? (
//           <div className="text-center py-16">
//             <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
//             <p className="text-gray-400">Start adding items you love to see them here</p>
//           </div>
//         ) : (
//           <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
//             {sortedItems.map((item) => (
//               <div key={item.id} className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 ${viewMode === 'list' ? 'flex' : ''}`}>
//                 <div className={`relative ${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'aspect-[3/4]'}`}>
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-2 right-2 flex gap-1">
//                     <button
//                       onClick={() => removeFromWishlist(item.id)}
//                       className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
//                     >
//                       <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
//                     </button>
//                   </div>
//                   {item.originalPrice > item.price && (
//                     <div className="absolute top-2 left-2">
//                       <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                         {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-4 flex-1">
//                   <div className="mb-2">
//                     <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
//                       {item.name}
//                     </h3>
//                     <p className="text-gray-500 text-xs uppercase tracking-wider">{item.type}</p>
//                   </div>

//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-lg font-semibold text-gray-900">₹{item.price.toLocaleString()}</span>
//                     {item.originalPrice > item.price && (
//                       <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => addToBag(item)}
//                       className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg"
//                     >
//                       <ShoppingBag className="w-4 h-4" />
//                       {viewMode === 'list' ? 'Add to Bag' : 'Add'}
//                     </button>
//                     <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:shadow-md border border-gray-200">
//                       <Eye className="w-4 h-4 text-gray-600 hover:text-gray-800" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const WishlistPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');
    const [notification, setNotification] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [productIds, setProductIds] = useState([]);

    // Load wishlist from local storage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistItems(storedWishlist);

        const ids = storedWishlist.map(item => item.id);
        setProductIds(ids);

        setLoaded(true);
    }, []);

    


    // Save only after load
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }

        const ids = wishlistItems.map(item => item.id);
        setProductIds(ids);

        console.log(ids);
        const userId=localStorage.getItem("userId");

        console.log(userId);

        if (userId && ids.length > 0) {
            updateWishlistInDB(userId, ids);
        }

    }, [wishlistItems, loaded]);


    const updateWishlistInDB = async (userId, productIds) => {
        const { data, error } = await supabase
            .from("wishlist")
            .upsert([{ user_id: userId, product_ids: productIds }], { onConflict: "user_id" });

        if (error) {
            console.error("Error updating wishlist:", error);
        } else {
            console.log("Wishlist updated:", data);
        }
    };

    // Remove from wishlist
    const removeFromWishlist = (cartId) => {
        const updated = wishlistItems.filter((item) => item.cartId !== cartId);
        setWishlistItems(updated);
        showNotification(`Item removed from wishlist`, "info");
    };

    // Add to bag
    const addToBag = (item) => {
        showNotification(`${item.name} added to your bag!`, 'success');
        console.log('Added to bag:', item.name);
    };

    // Notifications
    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(''), 3000);
    };

    // Sorting
    const sortedItems = [...wishlistItems].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            case 'oldest':
                return new Date(a.dateAdded) - new Date(b.dateAdded);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Notification */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${notification.type === 'success'
                        ? 'bg-green-500 border-green-600 text-white'
                        : notification.type === 'info'
                            ? 'bg-blue-500 border-blue-600 text-white'
                            : 'bg-gray-500 border-gray-600 text-white'
                        }`}
                >
                    {notification.message}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gray-300 bg-clip-text text-transparent">
                            My Wishlist
                        </h1>
                    </div>
                    <p className="text-gray-400 text-xl mb-8">
                        Your curated collection of dream pieces
                    </p>
                </div>

                {/* Wishlist Items */}
                {sortedItems.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-gray-400">
                            Start adding items you love to see them here
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                : 'space-y-4'
                        }
                    >
                        {sortedItems.map((item) => (
                            <div
                                key={item.cartId}
                                className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 ${viewMode === 'list' ? 'flex' : ''
                                    }`}
                            >
                                {/* Image */}
                                <div
                                    className={`relative ${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'aspect-[3/4]'
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button
                                            onClick={() => removeFromWishlist(item.cartId)}
                                            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
                                        </button>
                                    </div>
                                    {item.originalPrice > item.price && (
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-4 flex-1">
                                    <div className="mb-2">
                                        <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                                            {item.type}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-semibold text-gray-900">
                                            ₹{item.price.toLocaleString()}
                                        </span>
                                        {item.originalPrice > item.price && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ₹{item.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => addToBag(item)}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg"
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                            {viewMode === 'list' ? 'Add to Bag' : 'Add'}
                                        </button>
                                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:shadow-md border border-gray-200">
                                            <Eye className="w-4 h-4 text-gray-600 hover:text-gray-800" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;



//after auth and cart
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
// import { supabase } from '@/config/supabaseClient'; // ✅ make sure you have supabase client

// const WishlistPage = () => {
//     const [viewMode, setViewMode] = useState('grid');
//     const [sortBy, setSortBy] = useState('newest');
//     const [notification, setNotification] = useState('');
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [loaded, setLoaded] = useState(false);

//     // Load wishlist from local storage
//     useEffect(() => {
//         const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//         setWishlistItems(storedWishlist);
//         setLoaded(true);
//     }, []);

//     // Save only after load
//     useEffect(() => {
//         if (loaded) {
//             localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
//         }
//     }, [wishlistItems, loaded]);

//     // ✅ Remove from wishlist (local + supabase)
//     const removeFromWishlist = async (cartId) => {
//         const updated = wishlistItems.filter((item) => item.cartId !== cartId);
//         setWishlistItems(updated);
//         showNotification(`Item removed from wishlist`, "info");

//         // delete from supabase
//         await supabase.from('wishlist_items').delete().eq('cart_id', cartId);
//     };

//     // ✅ Add to bag (no DB for now)
//     const addToBag = (item) => {
//         showNotification(`${item.name} added to your bag!`, 'success');
//         console.log('Added to bag:', item.name);
//     };


//     // ✅ Add to wishlist (state + supabase)
//     const addToWishlist = async (item) => {
//         setWishlistItems((prev) => [...prev, item]);
//         showNotification(`${item.name} added to wishlist`, "success");

//         const { error } = await supabase.from("wishlist_items").upsert(
//             [
//                 {
//                     user_id: currentUserId,   // must come from your auth/session
//                     product_id: item.id,      // real product id from DB, not cartId
//                     name: item.name,
//                     type: item.type,
//                     price: item.price,
//                     original_price: item.originalPrice,
//                     image_url: item.image,
//                     date_added: new Date().toISOString(),
//                 },
//             ],
//             { onConflict: ["user_id", "product_id"] } // ✅ prevents duplicates
//         );


//         if (error) {
//             console.error("Error adding wishlist item:", error.message);
//             showNotification("Failed to sync with server", "error");
//         }
//     };

//     // Notifications
//     const showNotification = (message, type = 'info') => {
//         setNotification({ message, type });
//         setTimeout(() => setNotification(''), 3000);
//     };

//     // Sorting
//     const sortedItems = [...wishlistItems].sort((a, b) => {
//         switch (sortBy) {
//             case 'price-low':
//                 return a.price - b.price;
//             case 'price-high':
//                 return b.price - a.price;
//             case 'newest':
//                 return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
//             case 'oldest':
//                 return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
//             default:
//                 return 0;
//         }
//     });

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Notification */}
//             {notification && (
//                 <div
//                     className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${notification.type === 'success'
//                         ? 'bg-green-500 border-green-600 text-white'
//                         : notification.type === 'info'
//                             ? 'bg-blue-500 border-blue-600 text-white'
//                             : 'bg-gray-500 border-gray-600 text-white'
//                         }`}
//                 >
//                     {notification.message}
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <div className="inline-flex items-center gap-3 mb-6">
//                         <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
//                             <Heart className="w-6 h-6 text-white fill-current" />
//                         </div>
//                         <h1 className="text-3xl font-bold bg-gray-300 bg-clip-text text-transparent">
//                             My Wishlist
//                         </h1>
//                     </div>
//                     <p className="text-gray-400 text-xl mb-8">
//                         Your curated collection of dream pieces
//                     </p>
//                 </div>

//                 {/* Wishlist Items */}
//                 {sortedItems.length === 0 ? (
//                     <div className="text-center py-16">
//                         <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             Your wishlist is empty
//                         </h3>
//                         <p className="text-gray-400">
//                             Start adding items you love to see them here
//                         </p>
//                     </div>
//                 ) : (
//                     <div
//                         className={
//                             viewMode === 'grid'
//                                 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
//                                 : 'space-y-4'
//                         }
//                     >
//                         {sortedItems.map((item) => (
//                             <div
//                                 key={item.cartId}
//                                 className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 ${viewMode === 'list' ? 'flex' : ''
//                                     }`}
//                             >
//                                 {/* Image */}
//                                 <div
//                                     className={`relative ${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'aspect-[3/4]'
//                                         }`}
//                                 >
//                                     <img
//                                         src={item.image}
//                                         alt={item.name}
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <div className="absolute top-2 right-2 flex gap-1">
//                                         <button
//                                             onClick={() => removeFromWishlist(item.cartId)}
//                                             className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
//                                         >
//                                             <Trash2 className="w-3.5 h-3.5 text-gray-600 hover:text-red-500" />
//                                         </button>
//                                     </div>
//                                     {item.originalPrice > item.price && (
//                                         <div className="absolute top-2 left-2">
//                                             <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                                                 {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Details */}
//                                 <div className="p-4 flex-1">
//                                     <div className="mb-2">
//                                         <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
//                                             {item.name}
//                                         </h3>
//                                         <p className="text-gray-500 text-xs uppercase tracking-wider">
//                                             {item.type}
//                                         </p>
//                                     </div>

//                                     <div className="flex items-center gap-2 mb-4">
//                                         <span className="text-lg font-semibold text-gray-900">
//                                             ₹{item.price.toLocaleString()}
//                                         </span>
//                                         {item.originalPrice > item.price && (
//                                             <span className="text-sm text-gray-500 line-through">
//                                                 ₹{item.originalPrice.toLocaleString()}
//                                             </span>
//                                         )}
//                                     </div>

//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => addToBag(item)}
//                                             className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg"
//                                         >
//                                             <ShoppingBag className="w-4 h-4" />
//                                             {viewMode === 'list' ? 'Add to Bag' : 'Add'}
//                                         </button>
//                                         <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:shadow-md border border-gray-200">
//                                             <Eye className="w-4 h-4 text-gray-600 hover:text-gray-800" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WishlistPage;
