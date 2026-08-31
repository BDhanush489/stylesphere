import Link from "next/link";
import { getCollections } from "@/services/catalogService";

export const metadata = { title: "Collections | StyleSphere" };

export default async function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Shop The Edit</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Curated Collections</h1>
          <p className="text-gray-300 max-w-xl mx-auto">Hand-picked edits for every part of your week.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative aspect-[16/10] overflow-hidden bg-gray-100"
          >
            {collection.heroImage && (
              <img
                src={collection.heroImage}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="font-display text-3xl font-semibold">{collection.name}</h2>
              <p className="text-white/80 text-sm mt-1 max-w-xs">{collection.description}</p>
              <p className="text-white/60 text-xs mt-2">{collection.productCount} pieces</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
