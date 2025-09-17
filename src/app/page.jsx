// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ChevronRight, Star, Heart, ShoppingBag, Search, Menu, X, TrendingUp, Shield, Truck, RotateCcw, Sparkles, ArrowRight, Play } from 'lucide-react';
// import Link from 'next/link';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentHero, setCurrentHero] = useState(0);
//   const [likedItems, setLikedItems] = useState(new Set());

//   // Hero carousel data
//   const heroSlides = [
//     {
//       title: "Fall Collection 2024",
//       subtitle: "Embrace the season with our curated autumn essentials",
//       cta: "Shop Fall",
//       bg: "bg-gradient-to-r from-rose-500 via-pink-600 to-red-700"
//     },
//     {
//       title: "AI-Powered Style",
//       subtitle: "Let our smart assistant curate the perfect look for you",
//       cta: "Try Style AI",
//       bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
//     },
//     {
//       title: "Sustainable Fashion",
//       subtitle: "Eco-friendly materials, timeless designs, conscious choices",
//       cta: "Go Green",
//       bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
//     }
//   ];

//   // Featured products
//   const featuredProducts = [
//     { id: 1, name: "Minimalist Blazer", price: "₹3,999", originalPrice: "₹5,999", image: "🧥", category: "Blazers", rating: 4.8, reviews: 124 },
//     { id: 2, name: "Comfort Denim", price: "₹2,499", originalPrice: "₹3,499", image: "👖", category: "Jeans", rating: 4.6, reviews: 89 },
//     { id: 3, name: "Urban Sneakers", price: "₹4,599", originalPrice: "₹6,999", image: "👟", category: "Footwear", rating: 4.9, reviews: 203 },
//     { id: 4, name: "Silk Blend Shirt", price: "₹2,799", originalPrice: "₹3,999", image: "👔", category: "Shirts", rating: 4.7, reviews: 156 },
//     { id: 5, name: "Designer Handbag", price: "₹5,499", originalPrice: "₹7,999", image: "👜", category: "Accessories", rating: 4.8, reviews: 91 },
//     { id: 6, name: "Knit Sweater", price: "₹3,299", originalPrice: "₹4,799", image: "🧶", category: "Knitwear", rating: 4.5, reviews: 67 }
//   ];

//   // Categories
//   const categories = [
//     { name: "Shirts", items: "500+ items", image: "👔", gradient: "from-blue-500 to-purple-600", endpoint: "shirts" },
//     { name: "T Shirts", items: "650+ items", image: "👗", gradient: "from-pink-500 to-rose-600", endpoint: "tshirts" },
//     { name: "Jackets", items: "200+ items", image: "👜", gradient: "from-amber-500 to-orange-600", endpoint: "jackets" },
//     { name: "Footwear", items: "300+ items", image: "👟", gradient: "from-emerald-500 to-teal-600", endpoint: "footware" }
//   ];

//   // Auto-rotate hero
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentHero((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const toggleLike = (id) => {
//     setLikedItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <main className="min-h-screen bg-white">
//       {/* Navigation */}
     

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className={`absolute inset-0 ${heroSlides[currentHero].bg} transition-all duration-1000`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//         </div>

//         <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
//           <div className="mb-6">
//             <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
//               <Sparkles className="w-4 h-4 mr-2" />
//               New Collection Available
//             </span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//             {heroSlides[currentHero].title}
//           </h1>

//           <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
//             {heroSlides[currentHero].subtitle}
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center">
//               {heroSlides[currentHero].cta}
//               <ChevronRight className="ml-2 w-5 h-5" />
//             </button>
//             <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center">
//               <Play className="mr-2 w-5 h-5" />
//               Watch Style Guide
//             </button>
//           </div>
//         </div>

//         {/* Hero indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all ${index === currentHero ? 'bg-white' : 'bg-white/50'
//                 }`}
//               onClick={() => setCurrentHero(index)}
//             />
//           ))}
//         </div>
//       </section>

      

//       {/* Categories Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover our curated collections designed for every style and occasion
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category, index) => (
//               <Link key={index} href={`/${category.endpoint}`} className="group cursor-pointer block">
//                 <div key={index} className="group cursor-pointer">
//                   <div className={`relative h-64 bg-gradient-to-br ${category.gradient} rounded-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-300`}>
//                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
//                     <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
//                       <div className="text-6xl mb-4">{category.image}</div>
//                       <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
//                       <p className="text-sm opacity-90">{category.items}</p>
//                     </div>
//                     <div className="absolute bottom-4 right-4">
//                       <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Hand-picked items from our latest collection, loved by our community
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
//                 <div className="relative">
//                   <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                     <span className="text-6xl">{product.image}</span>
//                   </div>
//                   <button
//                     onClick={() => toggleLike(product.id)}
//                     className={`absolute top-4 right-4 p-2 rounded-full transition-all ${likedItems.has(product.id)
//                         ? 'bg-red-500 text-white'
//                         : 'bg-white/80 text-gray-600 hover:bg-white'
//                       }`}
//                   >
//                     <Heart className="w-5 h-5" fill={likedItems.has(product.id) ? 'currentColor' : 'none'} />
//                   </button>
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                       {Math.round(((parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))) / parseInt(product.originalPrice.slice(1))) * 100)}% OFF
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-purple-600 font-medium">{product.category}</span>
//                     <div className="flex items-center">
//                       <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
//                       <span className="ml-1 text-sm text-gray-400">({product.reviews})</span>
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">{product.name}</h3>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-xl font-bold text-gray-900">{product.price}</span>
//                       <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
//                     </div>
                
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
//               View All Products
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       {/* <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-white mb-4">Stay in Style</h2>
//           <p className="text-xl text-purple-100 mb-8">
//             Get the latest trends, exclusive offers, and style tips delivered to your inbox
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
//             />
//             <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
//               Subscribe
//             </button>
//           </div>

//           <p className="text-purple-200 text-sm mt-4">
//             Join 50,000+ style enthusiasts. Unsubscribe anytime.
//           </p>
//         </div>
//       </section> */}

//       {/* Features Section */}
//       <section className="py-16 bg-white-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
//               { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
//               { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
//               { icon: TrendingUp, title: "Trending Styles", desc: "Latest fashion trends" }
//             ].map((feature, index) => (
//               <div key={index} className="text-center">
//                 <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <feature.icon className="w-8 h-8 text-purple-600" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-sm text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
//                 Stylesphere
//               </h3>
//               <p className="text-gray-400 mb-4">
//                 Curating fashion that speaks to your unique style and personality.
//               </p>
//               <div className="flex space-x-4">
//                 <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
//                   <span className="text-sm">f</span>
//                 </div>
//                 <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
//                   <span className="text-sm">t</span>
//                 </div>
//                 <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
//                   <span className="text-sm">i</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Shop</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Shirts</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">T Shirts</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Bottoms</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Jackets</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Customer Care</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 Stylesphere. All rights reserved. | Privacy Policy | Terms of Service</p>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Heart, ShoppingBag, Search, Menu, X, TrendingUp, Shield, Truck, RotateCcw, Sparkles, ArrowRight, Play, Tag, Clock, Gift } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHero, setCurrentHero] = useState(0);
  const [likedItems, setLikedItems] = useState(new Set());

  const router = useRouter();

  // Hero carousel data
  const heroSlides = [
    {
      title: "Fall Collection 2024",
      subtitle: "Embrace the season with our curated autumn essentials",
      cta: "Shop Fall",
      bg: "bg-gradient-to-r from-rose-500 via-pink-600 to-red-700"
    },
    {
      title: "AI-Powered Style",
      subtitle: "Let our smart assistant curate the perfect look for you",
      cta: "Try Style AI",
      bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
    },
    {
      title: "Sustainable Fashion",
      subtitle: "Eco-friendly materials, timeless designs, conscious choices",
      cta: "Go Green",
      bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
    }
  ];

  // Featured products
  const featuredProducts = [
    { id: 1, name: "Minimalist Blazer", price: "₹3,999", originalPrice: "₹5,999", image: "🧥", category: "Blazers", rating: 4.8, reviews: 124, brand: "Allen Solly" },
    { id: 2, name: "Comfort Denim", price: "₹2,499", originalPrice: "₹3,499", image: "👖", category: "Jeans", rating: 4.6, reviews: 89, brand: "Levi's" },
    { id: 3, name: "Urban Sneakers", price: "₹4,599", originalPrice: "₹6,999", image: "👟", category: "Footwear", rating: 4.9, reviews: 203, brand: "Nike" },
    { id: 4, name: "Silk Blend Shirt", price: "₹2,799", originalPrice: "₹3,999", image: "👔", category: "Shirts", rating: 4.7, reviews: 156, brand: "Raymond" },
    { id: 5, name: "Designer Handbag", price: "₹5,499", originalPrice: "₹7,999", image: "👜", category: "Accessories", rating: 4.8, reviews: 91, brand: "Hidesign" },
    { id: 6, name: "Knit Sweater", price: "₹3,299", originalPrice: "₹4,799", image: "🧶", category: "Knitwear", rating: 4.5, reviews: 67, brand: "Zara" }
  ];

  // Categories
  const categories = [
    { name: "Shirts", items: "500+ items", image: "👔", gradient: "from-blue-500 to-purple-600", endpoint: "shirts" },
    { name: "T Shirts", items: "650+ items", image: "👗", gradient: "from-pink-500 to-rose-600", endpoint: "tshirts" },
    { name: "Jackets", items: "200+ items", image: "👜", gradient: "from-amber-500 to-orange-600", endpoint: "jackets" },
    { name: "Footwear", items: "300+ items", image: "👟", gradient: "from-emerald-500 to-teal-600", endpoint: "footware" }
  ];

  // Seasonal offers data
  const seasonalOffers = [
    {
      id: 1,
      title: "FESTIVE SALE",
      subtitle: "Up to 70% OFF",
      description: "Diwali Special Collection",
      bg: "bg-gradient-to-r from-orange-500 to-red-600",
      image: "🪔",
      timeLeft: "2 Days Left"
    },
    {
      id: 2,
      title: "WINTER PREP",
      subtitle: "Flat 50% OFF",
      description: "Sweaters & Jackets",
      bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
      image: "❄️",
      timeLeft: "Limited Time"
    },
    {
      id: 3,
      title: "WEEKEND SPECIAL",
      subtitle: "Buy 2 Get 1 Free",
      description: "On all T-Shirts",
      bg: "bg-gradient-to-r from-green-500 to-teal-600",
      image: "🎯",
      timeLeft: "This Weekend"
    }
  ];

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section - Myntra Banner Style */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className={`absolute inset-0 ${heroSlides[currentHero].bg} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {heroSlides[currentHero].title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                {heroSlides[currentHero].subtitle}
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-all uppercase tracking-wide text-sm">
                {heroSlides[currentHero].cta}
              </button>
            </div>
          </div>
        </div>

        {/* Hero indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === currentHero ? 'bg-white' : 'bg-white/50'
                }`}
              onClick={() => setCurrentHero(index)}
            />
          ))}
        </div>
      </section>

      {/* Seasonal Offers Section - New */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SEASONAL OFFERS</h2>
            <p className="text-gray-600">Don't miss out on these limited-time deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalOffers.map((offer) => (
              <div key={offer.id} className="group cursor-pointer">
                <div className={`relative h-64 ${offer.bg} rounded-lg overflow-hidden transform group-hover:scale-105 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div>
                      <div className="text-4xl mb-2">{offer.image}</div>
                      <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                      <p className="text-2xl font-black mb-2">{offer.subtitle}</p>
                      <p className="text-sm opacity-90">{offer.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{offer.timeLeft}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Myntra Grid Style */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SHOP BY CATEGORY</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => router.push(`/${category.endpoint}`)}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gray-50 flex items-center justify-center">
                    <span className="text-6xl">{category.image}</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.items}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Myntra Product Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">TRENDING NOW</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl">{product.image}</span>
                  </div>
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${likedItems.has(product.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-white text-gray-400 hover:bg-pink-500 hover:text-white'
                      }`}
                  >
                    <Heart className="w-4 h-4" fill={likedItems.has(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <div className="absolute top-2 left-2">
                    <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      {Math.round(((parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))) / parseInt(product.originalPrice.slice(1))) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{product.brand}</h4>
                  <h3 className="text-gray-600 text-sm mb-2 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-bold text-gray-900">{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                  </div>

                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-orange-400 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                    <span className="ml-1 text-xs text-gray-400">({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-pink-500 text-pink-500 px-8 py-2 rounded font-bold hover:bg-pink-500 hover:text-white transition-all uppercase tracking-wide text-sm">
              View All
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Myntra Style Icons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999", color: "text-green-600" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy", color: "text-blue-600" },
              { icon: Shield, title: "100% Original", desc: "Authentic products", color: "text-purple-600" },
              { icon: TrendingUp, title: "Trending Styles", desc: "Latest fashion trends", color: "text-pink-600" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Myntra Style */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Online Shopping</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-pink-600">Men</a></li>
                <li><a href="#" className="hover:text-pink-600">Women</a></li>
                <li><a href="#" className="hover:text-pink-600">Kids</a></li>
                <li><a href="#" className="hover:text-pink-600">Home & Living</a></li>
                <li><a href="#" className="hover:text-pink-600">Beauty</a></li>
                <li><a href="#" className="hover:text-pink-600">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Customer Policies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-pink-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-pink-600">FAQ</a></li>
                <li><a href="#" className="hover:text-pink-600">T&C</a></li>
                <li><a href="#" className="hover:text-pink-600">Terms Of Use</a></li>
                <li><a href="#" className="hover:text-pink-600">Track Orders</a></li>
                <li><a href="#" className="hover:text-pink-600">Shipping</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Experience Stylesphere App</h3>
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs">App Store</span>
                  </div>
                  <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs">Google Play</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Keep in touch</h4>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-600 text-xs">f</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-600 text-xs">t</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-600 text-xs">i</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-600 text-xs">y</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Stylesphere</h3>
                <p className="text-sm text-gray-600">India's leading fashion destination</p>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">100% ORIGINAL guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Return within 30 days</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 www.stylesphere.com. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}