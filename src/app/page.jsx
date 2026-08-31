'use client';

import React, { useEffect, useState } from 'react';
import { Star, Heart, TrendingUp, Shield, Truck, RotateCcw, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

const heroSlides = [
  {
    title: "Fall Collection 2024",
    subtitle: "Embrace the season with our curated autumn essentials",
    cta: "Shop Fall",
    href: "/jackets",
    bg: "bg-gradient-to-r from-rose-500 via-pink-600 to-red-700"
  },
  {
    title: "Everyday Essentials",
    subtitle: "Wardrobe staples curated for effortless style",
    cta: "Shop Now",
    href: "/shirts",
    bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
  },
  {
    title: "Casual Comfort",
    subtitle: "Relaxed fits, breathable fabrics, everyday wear",
    cta: "Shop T-Shirts",
    href: "/tshirts",
    bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
  }
];

const categories = [
  { name: "Shirts", items: "Shop the range", image: "👔", endpoint: "shirts", comingSoon: false },
  { name: "T-Shirts", items: "Shop the range", image: "👕", endpoint: "tshirts", comingSoon: false },
  { name: "Jackets", items: "Shop the range", image: "🧥", endpoint: "jackets", comingSoon: false },
  { name: "Footwear", items: "Coming soon", image: "👟", endpoint: "footwear", comingSoon: true },
];

const seasonalOffers = [
  {
    id: 1,
    title: "FESTIVE SALE",
    subtitle: "Up to 70% OFF",
    description: "Diwali Special Collection",
    bg: "bg-gradient-to-r from-orange-500 to-red-600",
    image: "🪔",
    timeLeft: "2 Days Left",
    href: "/shirts",
  },
  {
    id: 2,
    title: "WINTER PREP",
    subtitle: "Flat 50% OFF",
    description: "Jackets & Outerwear",
    bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
    image: "❄️",
    timeLeft: "Limited Time",
    href: "/jackets",
  },
  {
    id: 3,
    title: "WEEKEND SPECIAL",
    subtitle: "Buy 2 Get 1 Free",
    description: "On all T-Shirts",
    bg: "bg-gradient-to-r from-green-500 to-teal-600",
    image: "🎯",
    timeLeft: "This Weekend",
    href: "/tshirts",
  }
];

const TRENDING_SOURCES = [
  { endpoint: "/api/shirts", basePath: "/shirts", type: "shirt", fallbackIcon: "👔" },
  { endpoint: "/api/tshirts", basePath: "/tshirts", type: "tshirt", fallbackIcon: "👕" },
  { endpoint: "/api/jackets", basePath: "/jackets", type: "jacket", fallbackIcon: "🧥" },
];

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [trending, setTrending] = useState([]);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Promise.all(
      TRENDING_SOURCES.map((source) =>
        fetch(source.endpoint)
          .then((res) => res.json())
          .then((data) =>
            (Array.isArray(data) ? data : []).slice(0, 2).map((product) => ({
              ...product,
              basePath: source.basePath,
              type: source.type,
              fallbackIcon: source.fallbackIcon,
            }))
          )
          .catch(() => [])
      )
    ).then((results) => setTrending(results.flat()));
  }, []);

  const getDiscountPercentage = (original, current) =>
    Math.round(((original - current) / original) * 100);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
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
              <Link
                href={heroSlides[currentHero].href}
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-all uppercase tracking-wide text-sm"
              >
                {heroSlides[currentHero].cta}
              </Link>
            </div>
          </div>
        </div>

        {/* Hero indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              aria-label={`Show slide ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${index === currentHero ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setCurrentHero(index)}
            />
          ))}
        </div>
      </section>

      {/* Seasonal Offers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SEASONAL OFFERS</h2>
            <p className="text-gray-600">Don&apos;t miss out on these limited-time deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalOffers.map((offer) => (
              <Link href={offer.href} key={offer.id} className="group cursor-pointer block">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SHOP BY CATEGORY</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const card = (
                <div
                  className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                    category.comingSoon ? 'opacity-60' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="h-48 bg-gray-50 flex items-center justify-center relative">
                    <span className="text-6xl">{category.image}</span>
                    {category.comingSoon && (
                      <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.items}</p>
                  </div>
                </div>
              );

              return category.comingSoon ? (
                <div key={category.name} className="cursor-not-allowed">{card}</div>
              ) : (
                <Link key={category.name} href={`/${category.endpoint}`} className="group cursor-pointer">
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">TRENDING NOW</h2>
          </div>

          {trending.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trending.map((product) => (
                <Link
                  href={`${product.basePath}/${product.id}`}
                  key={`${product.basePath}-${product.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group block"
                >
                  <div className="relative">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-4xl">
                        {product.fallbackIcon}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product, undefined, product.type);
                      }}
                      aria-label="Toggle wishlist"
                      className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                        isWishlisted(product.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-400 hover:bg-pink-500 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-gray-600 text-sm mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-orange-400 fill-current" />
                      <span className="ml-1 text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/shirts"
              className="inline-block border border-pink-500 text-pink-500 px-8 py-2 rounded font-bold hover:bg-pink-500 hover:text-white transition-all uppercase tracking-wide text-sm"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999", color: "text-green-600" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy", color: "text-blue-600" },
              { icon: Shield, title: "100% Original", desc: "Authentic products", color: "text-purple-600" },
              { icon: TrendingUp, title: "Trending Styles", desc: "Latest fashion trends", color: "text-pink-600" }
            ].map((feature) => (
              <div key={feature.title} className="text-center">
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
    </main>
  );
}
