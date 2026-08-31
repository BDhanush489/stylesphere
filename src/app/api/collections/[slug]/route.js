import { getCollectionBySlug, getProducts } from "@/services/catalogService";

export async function GET(req, { params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return Response.json({ error: "Collection not found" }, { status: 404 });
  }

  const { items: products } = getProducts({ tag: collection.tag, sort: "newest" });
  return Response.json({ ...collection, products });
}
