import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandBySlug, getProducts } from "@/services/catalogService";
import { CATEGORY_LABELS } from "@/lib/catalog/localImages";
import BrandMark from "@/components/BrandMark";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  return { title: brand ? `${brand.name} | StyleSphere` : "Brand | StyleSphere" };
}

export default async function BrandDetailPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const { items: products } = getProducts({ brand: slug, sort: "newest" });

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] bg-gray-900 overflow-hidden">
        {brand.heroImage && (
          <img
            src={brand.heroImage}
            alt={brand.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12 text-white">
          <nav className="text-xs text-white/70 mb-4">
            <Link href="/brands" className="hover:text-white">Brands</Link> <span className="mx-1">/</span> {brand.name}
          </nav>
          <div className="flex items-center gap-4">
            <BrandMark brand={brand} size={64} className="ring-2 ring-white" />
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold">{brand.name}</h1>
              <p className="text-white/80 text-sm uppercase tracking-wide mt-1">{brand.aesthetic}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">{brand.description}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {brand.categories.map((cat) => (
            <span key={cat} className="text-xs uppercase tracking-wide border border-gray-300 px-3 py-1.5 text-gray-600">
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
          {brand.name} at StyleSphere ({brand.productCount})
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products from this brand yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.slice(0, 24).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
