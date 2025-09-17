// "use client";

// import { useState } from "react";
// import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/AuthContext";

// export default function Navbar() {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();

//   return (
//     <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div
//             className="flex-shrink-0 cursor-pointer"
//             onClick={() => router.push("/")}
//           >
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               Stylesphere
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               <button onClick={() => router.push("/shop")} className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
//                 Shop
//               </button>
//               <button onClick={() => router.push("/collections")} className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
//                 Collections
//               </button>
//               <button onClick={() => router.push("/about")} className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
//                 About
//               </button>
//               <button onClick={() => router.push("/contact")} className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
//                 Contact
//               </button>
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-4">
//             <Search className="h-5 w-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
//             <Heart className="h-5 w-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
//             <div className="relative">
//               <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
//               <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">0</span>
//             </div>

//             {/* Auth Section */}
//             {user ? (
//               <div className="flex items-center space-x-2">
//                 <img src={`${user.picture}?sz=64`} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
//                 <button onClick={logout} className="text-sm text-gray-600 hover:text-purple-600">
//                   Sign out
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => router.push("/login")}
//                 className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//               >
//                 Sign in
//               </button>

//             )}

//             {/* Mobile menu toggle */}
//             <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <h1 className="text-2xl font-bold text-pink-600">Stylesphere</h1>
          </div>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => router.push("/")}
              className="text-gray-800 hover:text-pink-600 font-medium text-sm uppercase tracking-wide"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/about")}
              className="text-gray-800 hover:text-pink-600 font-medium text-sm uppercase tracking-wide"
            >
              About Us
            </button>

            {/* Shop with dropdown */}
            <div className="relative group">
              <button
                className="text-gray-800 hover:text-pink-600 font-medium text-sm uppercase tracking-wide"
              >
                Shop
              </button>
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-1.2 w-56 bg-white border border-gray-200 shadow-lg rounded hidden group-hover:block z-50"
              >
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => router.push("/shirts")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Shirts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/tshirts")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      T-Shirts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/jackets")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Jackets, Shackets & Overshirts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/hoodies")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sweatshirts & Hoodies
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/jeans")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Jeans, Denim & Chinos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/trackpants")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Track Pants & Shorts
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => router.push("/contact")}
              className="text-gray-800 hover:text-pink-600 font-medium text-sm uppercase tracking-wide"
            >
              Contact
            </button>
          </div>


          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="flex flex-col items-center text-gray-700 hover:text-pink-600">
              <Heart className="w-5 h-5" onClick={() => router.push("/wishlist")} />
              <span className="text-xs mt-1">Wishlist</span>
            </button>

            <div className="relative flex flex-col items-center text-gray-700 hover:text-pink-600 cursor-pointer" onClick={() => router.push("/cart")}>
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs mt-1">Bag</span>
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={`${user.picture}?sz=64`}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-200"
                />
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-pink-600"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Sign in
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Mobile Links */}
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/men")}
                  className="block text-gray-800 font-medium"
                >
                  Men
                </button>
                <button
                  onClick={() => router.push("/women")}
                  className="block text-gray-800 font-medium"
                >
                  Women
                </button>
                <button
                  onClick={() => router.push("/kids")}
                  className="block text-gray-800 font-medium"
                >
                  Kids
                </button>
                <button
                  onClick={() => router.push("/home-living")}
                  className="block text-gray-800 font-medium"
                >
                  Home & Living
                </button>
                <button
                  onClick={() => router.push("/beauty")}
                  className="block text-gray-800 font-medium"
                >
                  Beauty
                </button>
                <button
                  onClick={() => router.push("/studio")}
                  className="block text-gray-800 font-medium"
                >
                  Studio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
