import { getProducts } from "@/services/catalogService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const sizes = searchParams.get("sizes");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const { items, total } = getProducts({
    brand: searchParams.get("brand") || undefined,
    category: searchParams.get("category") || undefined,
    tag: searchParams.get("tag") || undefined,
    search: searchParams.get("q") || undefined,
    sort: searchParams.get("sort") || undefined,
    sizes: sizes ? sizes.split(",") : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    onSale: searchParams.get("onSale") === "true",
    inStockOnly: searchParams.get("inStockOnly") === "true",
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : 0,
  });

  return Response.json({ items, total });
}
