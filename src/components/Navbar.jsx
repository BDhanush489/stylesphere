"use client";

import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const SHOP_LINKS = [
  { name: "Shirts", href: "/shirts" },
  { name: "T-Shirts", href: "/tshirts" },
  { name: "Jackets", href: "/jackets" },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const linkClass = (href) =>
    `font-medium text-sm uppercase tracking-wide transition-colors ${
      pathname === href ? "text-pink-600" : "text-gray-800 hover:text-pink-600"
    }`;

  const submitSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-600">Stylesphere</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/about" className={linkClass("/about")}>About Us</Link>

            {/* Shop with dropdown */}
            <div className="relative group">
              <button
                className={`font-medium text-sm uppercase tracking-wide transition-colors ${
                  SHOP_LINKS.some(l => l.href === pathname) ? "text-pink-600" : "text-gray-800 group-hover:text-pink-600"
                }`}
              >
                Shop
              </button>
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-lg rounded hidden group-hover:block z-50">
                <ul className="py-2">
                  {SHOP_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={submitSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" aria-label="Wishlist" className="relative flex flex-col items-center text-gray-700 hover:text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" aria-label="Shopping bag" className="relative flex flex-col items-center text-gray-700 hover:text-pink-600">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs mt-1">Bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-2">
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
                className="hidden sm:inline-block px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Sign in
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              <form onSubmit={submitSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </form>

              {/* Mobile Links */}
              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-800 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-400 mb-2">Shop</p>
                  {SHOP_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-800 font-medium py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                {!user && (
                  <button
                    onClick={() => { setIsMenuOpen(false); router.push("/login"); }}
                    className="w-full mt-2 px-3 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
