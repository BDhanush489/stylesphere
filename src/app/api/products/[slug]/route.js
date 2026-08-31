import { getProductBySlug, getRelatedProducts } from "@/services/catalogService";

export async function GET(req, { params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const related = getRelatedProducts(product, 4);
  return Response.json({ ...product, related });
}
