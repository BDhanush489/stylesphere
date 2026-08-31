// Server-only catalog service. Every page/route reads the catalog through
// here instead of touching the filesystem or a database directly — so
// swapping the prototype data layer for real Postgres tables later only
// means rewriting this file, not every caller.
import { CATEGORIES, listCategoryImages } from "@/lib/catalog/localImages";
import { buildProduct } from "@/lib/catalog/productFactory";
import { BRANDS, getBrandMeta } from "@/lib/catalog/brands";
import { COLLECTIONS, getCollectionMeta } from "@/lib/catalog/collections";

let productCache = null;

function loadAllProducts() {
  if (productCache) return productCache;
  const products = [];
  for (const category of CATEGORIES) {
    listCategoryImages(category).forEach((filename, index) => {
      products.push(buildProduct({ category, filename, index }));
    });
  }
  productCache = products;
  return products;
}

function sortProducts(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
      break;
    default:
      break;
  }
  return sorted;
}

export function getBrands() {
  const products = loadAllProducts();
  return BRANDS.map((brand) => {
    const brandProducts = products.filter((p) => p.brandSlug === brand.slug);
    return {
      ...brand,
      productCount: brandProducts.length,
      heroImage: brandProducts[0]?.image || null,
    };
  });
}

export function getBrandBySlug(slug) {
  const brand = getBrandMeta(slug);
  if (!brand) return null;
  const products = loadAllProducts().filter((p) => p.brandSlug === slug);
  return {
    ...brand,
    productCount: products.length,
    heroImage: products[0]?.image || null,
  };
}

export function getProducts({
  brand,
  category,
  sizes,
  minPrice,
  maxPrice,
  onSale,
  inStockOnly,
  tag,
  search,
  sort,
  limit,
  offset = 0,
} = {}) {
  let list = loadAllProducts();

  if (brand) list = list.filter((p) => p.brandSlug === brand);
  if (category) list = list.filter((p) => p.category === category);
  if (tag) list = list.filter((p) => p.tags.includes(tag));
  if (sizes?.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
  if (typeof minPrice === "number") list = list.filter((p) => p.price >= minPrice);
  if (typeof maxPrice === "number") list = list.filter((p) => p.price <= maxPrice);
  if (onSale) list = list.filter((p) => p.originalPrice > p.price);
  if (inStockOnly) list = list.filter((p) => p.availability === "in_stock");
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }

  list = sortProducts(list, sort);
  const total = list.length;

  if (typeof limit === "number") {
    list = list.slice(offset, offset + limit);
  }

  return { items: list, total };
}

export function getProductBySlug(slug) {
  return loadAllProducts().find((p) => p.slug === slug) || null;
}

export function getRelatedProducts(product, count = 4) {
  if (!product) return [];
  return loadAllProducts()
    .filter((p) => p.slug !== product.slug && (p.brandSlug === product.brandSlug || p.category === product.category))
    .slice(0, count);
}

export function getCollections() {
  const products = loadAllProducts();
  return COLLECTIONS.map((collection) => {
    const matches = products.filter((p) => p.tags.includes(collection.tag));
    return { ...collection, productCount: matches.length, heroImage: matches[0]?.image || null };
  });
}

export function getCollectionBySlug(slug) {
  const collection = getCollectionMeta(slug);
  if (!collection) return null;
  const matches = loadAllProducts().filter((p) => p.tags.includes(collection.tag));
  return { ...collection, productCount: matches.length, heroImage: matches[0]?.image || null };
}

export function getCatalogStats() {
  const products = loadAllProducts();
  return {
    brandCount: BRANDS.length,
    productCount: products.length,
    collectionCount: COLLECTIONS.length,
  };
}
