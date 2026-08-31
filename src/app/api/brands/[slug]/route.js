import { getBrandBySlug, getProducts } from "@/services/catalogService";

export async function GET(req, { params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return Response.json({ error: "Brand not found" }, { status: 404 });
  }

  const { items: products } = getProducts({ brand: slug, sort: "newest" });
  return Response.json({ ...brand, products });
}
