"use client";

import { useState } from "react";
import { Search, Heart, Sparkles, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Brands", href: "/brands" },
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
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
            <h1 className="font-display text-2xl font-bold text-gray-900">StyleSphere</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={submitSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands, products…"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/try-on"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-pink-600"
            >
              <Sparkles className="w-4 h-4" /> Try It On
            </Link>

            <Link href="/wishlist" aria-label="Wishlist" className="relative flex flex-col items-center text-gray-700 hover:text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1 hidden sm:block">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {wishlistCount}
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
                <button onClick={logout} className="text-sm text-gray-600 hover:text-pink-600">
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="hidden sm:inline-block px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-black"
              >
                Sign in
              </button>
            )}

            {/* Mobile menu toggle */}
            <button className="lg:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={submitSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brands, products…"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </form>

              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium">
                    {link.name}
                  </Link>
                ))}
                <Link href="/try-on" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1.5 text-gray-800 font-medium">
                  <Sparkles className="w-4 h-4" /> Try It On
                </Link>
                {!user && (
                  <button
                    onClick={() => { setIsMenuOpen(false); router.push("/login"); }}
                    className="w-full mt-2 px-3 py-2 text-sm bg-gray-900 text-white rounded hover:bg-black"
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
