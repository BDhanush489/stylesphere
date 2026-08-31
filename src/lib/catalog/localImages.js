// Reads product photography filenames from a build-time manifest rather
// than the filesystem at request time.
//
// This used to call fs.readdirSync(process.cwd() + "/public/...") directly.
// That works under `next dev`/`next start` but is NOT reliable on Vercel:
// `/public` is uploaded to their static CDN separately from the serverless
// function bundle, so a dynamic route (any of our `ƒ` routes — /api/products,
// /brands/[slug], /products/[slug], etc.) reading it via `fs` at request time
// can silently see an empty or missing directory in production even though
// `next build`/local testing look fine. Importing a plain JSON manifest
// instead makes this a normal bundled module with no runtime filesystem
// dependency, so it behaves identically in dev, `next start`, and on Vercel.
//
// Regenerate imageManifest.json if photos are added/removed under
// public/{shirts,tshirts,jackets}/images (see the one-off script used to
// generate it — a plain fs.readdirSync loop over each category folder).
import manifest from "./imageManifest.json";

export const CATEGORIES = ["shirts", "tshirts", "jackets"];

export const CATEGORY_LABELS = {
  shirts: "Shirts",
  tshirts: "T-Shirts",
  jackets: "Jackets",
};

export function listCategoryImages(category) {
  return manifest[category] || [];
}
