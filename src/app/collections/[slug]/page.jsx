import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollectionBySlug, getProducts } from "@/services/catalogService";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return { title: collection ? `${collection.name} | StyleSphere` : "Collection | StyleSphere" };
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const { items: products } = getProducts({ tag: collection.tag, sort: "newest" });

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 bg-gray-900 overflow-hidden">
        {collection.heroImage && (
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-10 text-white">
          <nav className="text-xs text-white/70 mb-3">
            <Link href="/collections" className="hover:text-white">Collections</Link> <span className="mx-1">/</span>{" "}
            {collection.name}
          </nav>
          <h1 className="font-display text-4xl font-semibold">{collection.name}</h1>
          <p className="text-white/80 mt-2 max-w-lg">{collection.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {products.length === 0 ? (
          <p className="text-gray-500">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
