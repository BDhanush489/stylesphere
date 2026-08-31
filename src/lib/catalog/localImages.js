// Server-only. Reads the bundled product photography from /public/{category}/images.
//
// PROTOTYPE DATA LAYER: this stands in for a real product-images table/CDN.
// Swap listCategoryImages() for a database query once brands/products are
// managed through the admin CMS instead of the filesystem.
import fs from "fs";
import path from "path";

export const CATEGORIES = ["shirts", "tshirts", "jackets"];

export const CATEGORY_LABELS = {
  shirts: "Shirts",
  tshirts: "T-Shirts",
  jackets: "Jackets",
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function listCategoryImages(category) {
  const dir = path.join(process.cwd(), "public", category, "images");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort(); // stable, deterministic ordering across requests
}
