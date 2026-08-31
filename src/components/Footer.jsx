"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed! Watch your inbox for style drops.");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="font-display text-xl font-bold text-white">StyleSphere</h2>
          <p className="mt-3 text-sm">
            A premium multi-brand fashion destination — explore collections, preview them on yourself, and visit us
            in person.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link href="/try-on" className="hover:text-white transition-colors">Virtual Try-On</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Company</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Visit</Link></li>
            <li><Link href="/enquire" className="hover:text-white transition-colors">Enquire Now</Link></li>
          </ul>
          <div className="flex space-x-3 mt-4">
            <a href="#" aria-label="Facebook" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Stay Updated</h2>
          <p className="mt-3 text-sm">Subscribe to our newsletter for the latest arrivals and drops.</p>
          <form onSubmit={handleSubscribe} className="mt-4 flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-600 px-4 rounded-r-md text-white font-medium hover:bg-pink-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StyleSphere. All rights reserved.
      </div>
    </footer>
  );
}
