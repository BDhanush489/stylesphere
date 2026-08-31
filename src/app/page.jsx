import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Clock } from "lucide-react";
import { getBrands, getCollections, getProducts } from "@/services/catalogService";
import BrandMark from "@/components/BrandMark";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const brands = getBrands();
  const collections = getCollections();
  const { items: newArrivals } = getProducts({ sort: "newest", limit: 8 });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden bg-gray-900">
        <img
          src="/tryon/demo-model.png"
          alt="Featured StyleSphere look"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-16 w-full text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-4">StyleSphere</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-6 max-w-2xl">
            Discover Your Style.
          </h1>
          <p className="text-white/80 max-w-md mb-8">
            A curated multi-brand fashion destination — explore collections, preview them on yourself, and visit us
            in person.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="bg-white text-gray-900 px-8 py-3.5 font-semibold hover:bg-gray-100 transition-colors">
              Explore Collections
            </Link>
            <Link
              href="/try-on"
              className="border-2 border-white text-white px-8 py-3.5 font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Try It On
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Curated Roster</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">Featured Brands</h2>
          </div>
          <Link href="/brands" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:gap-2 transition-all">
            View All Brands <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group">
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-3">
                {brand.heroImage && (
                  <img
                    src={brand.heroImage}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <BrandMark brand={brand} size={40} className="absolute bottom-3 left-3 ring-2 ring-white" />
              </div>
              <h3 className="font-medium text-gray-900">{brand.name}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{brand.aesthetic}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Just In</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">New Arrivals</h2>
            </div>
            <Link href="/products?sort=newest" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:gap-2 transition-all">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Try-On promo */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-pink-400 font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> StyleSphere Virtual Try-On
            </span>
            <h2 className="font-display text-4xl font-semibold mb-4">See It On You Before You Buy.</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              Upload a photo or use our demo model, and preview how a piece looks before you commit — no guesswork,
              no store trip required.
            </p>
            <Link href="/try-on" className="inline-block bg-white text-gray-900 px-8 py-3.5 font-semibold hover:bg-gray-100 transition-colors">
              Try Virtual Try-On
            </Link>
          </div>
          <div className="relative aspect-[4/5] bg-gray-800 overflow-hidden">
            <img src="/tryon/demo-model.png" alt="Virtual try-on preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Shop The Edit</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">Curated Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-100"
            >
              {collection.heroImage && (
                <img
                  src={collection.heroImage}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display text-2xl font-semibold">{collection.name}</h3>
                <p className="text-sm text-white/80">{collection.productCount} pieces</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Store Experience */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">The Showroom</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Visit StyleSphere</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Prefer to see it in person? Our showroom team can help you find the right fit, fabric, and finish.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Visit our showroom
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> Open daily, by appointment
            </span>
          </div>
          <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3.5 font-semibold hover:bg-black transition-colors">
            Visit StyleSphere
          </Link>
        </div>
      </section>
    </main>
  );
}
