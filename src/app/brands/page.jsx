import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBrands } from "@/services/catalogService";
import BrandMark from "@/components/BrandMark";

export const metadata = { title: "Brands | StyleSphere" };

export default async function BrandsPage() {
  const brands = getBrands();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">StyleSphere</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">The Brands We Carry</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            A curated roster of labels, each with its own point of view — from heritage outerwear to sharp modern
            tailoring.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group relative overflow-hidden border border-gray-200 hover:border-gray-900 transition-colors"
          >
            <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
              {brand.heroImage && (
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <BrandMark brand={brand} size={44} className="ring-2 ring-white" />
                <div>
                  <h2 className="font-display text-white text-2xl font-semibold">{brand.name}</h2>
                  <p className="text-white/80 text-xs uppercase tracking-wide">{brand.aesthetic}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4">{brand.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
                View Collection <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
