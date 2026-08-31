# StyleSphere — Feature Status

This tracks what's real, what's a stand-in, and what still needs an external
service or credentials before it can go live. Read this before demoing a
feature or deciding what to build on top of it.

Legend:
- **Production-ready** — works as a real user would expect, no caveats.
- **Prototype** — the UX flow works end-to-end, but the data or output behind
  it is a stand-in (local/deterministic/in-memory), not a real backend.
- **Future integration** — the architecture/contract exists, but a real
  external provider or credentials are required to make it do the real thing.

## Catalog (Brands, Products, Collections)

**Status: Prototype**, behind a clean service boundary.

- `src/services/catalogService.js` is the only thing pages/routes should call.
  Everything else (`src/lib/catalog/*`) is prototype plumbing behind it.
- Product photography is real (391 bundled images under `public/{shirts,tshirts,jackets}/images`),
  but attributes — brand assignment, price, material, fit, tags, availability —
  are deterministically generated from a hash of the filename. They're stable
  across requests, not stored anywhere.
- The list of filenames per category comes from a build-time manifest
  (`src/lib/catalog/imageManifest.json`), not a runtime `fs.readdirSync` over
  `/public`. Reading `/public` via `fs` inside a serverless function is not
  reliable on Vercel (static assets are uploaded to their CDN separately
  from the function bundle), so any dynamic route doing that could see an
  empty/missing directory in production. Regenerate the manifest if photos
  are added or removed.
- Brands (`src/lib/catalog/brands.js`) and Collections (`src/lib/catalog/collections.js`)
  are hard-coded. ClothHive's logo is a real bundled asset; the others use a
  typographic monogram (`src/components/BrandMark.jsx`) as a placeholder.
- **To go to production:** replace `src/lib/catalog/*` with real
  `brands` / `products` / `collections` tables and rewrite `catalogService.js`
  to query them. No caller outside that file needs to change.

## Product Detail, Gallery, Search, Wishlist

**Status: Production-ready UI, running on prototype data.**

- Product pages, filtering/sorting, and text search all work end-to-end
  against the catalog above.
- Wishlist (`src/context/WishlistContext.jsx`) persists per-browser via
  `localStorage` — this is a real, working feature, not a stand-in.

## Enquiry Flow ("Enquire Now" / "Check Availability")

**Status: Prototype persistence.**

- `src/services/inquiryService.js` stores submissions in a JSON file under
  the OS temp directory, not a real database — it's file-backed rather than
  an in-memory array specifically because Next.js bundles Route Handlers and
  Server Component pages into separate module graphs, so a plain
  module-level array is NOT actually shared between `POST /api/inquiries`
  and the `/admin` page. It uses `os.tmpdir()` rather than a project-relative
  folder because Vercel's serverless functions have a read-only filesystem
  outside of `/tmp`. This still won't survive a redeploy, a cold start on a
  fresh instance, or work across multiple concurrent server instances.
- The form, validation, and confirmation UX (`/enquire`) are real and usable
  today for collecting leads in a demo/staging setting.
- **To go to production:** swap `inquiryService.js` for a real `inquiries`
  table (and probably an email/Slack notification on create). Nothing else
  needs to change.

## Virtual Try-On

**Status: Prototype preview, future-integration-ready architecture.**

- `src/services/virtualTryOnService.js` is the abstraction. It checks
  `GET /api/try-on` for a configured provider; today none is configured, so
  it composites a clearly-labeled local demo preview entirely in the browser
  (a flat garment-thumbnail overlay + a baked-in "Demo Preview — Illustrative
  Only" watermark) — this is intentionally NOT presented as a real AI fit.
- No image data leaves the browser in demo mode. Once `TRYON_PROVIDER` (and
  the provider's own credentials) are configured server-side, `POST /api/try-on`
  starts doing real work and the frontend automatically switches to showing
  `{ mode: "ai" }` results — no frontend changes required.
- Privacy: uploaded photos are never persisted; they exist only as an
  in-memory object URL in the browser tab.

## 360° Product Viewer

**Status: Production-ready interaction, prototype content.**

- `src/components/Product360Viewer.jsx` supports drag/touch rotation across
  multiple frames, zoom, and fullscreen — genuinely functional.
- No product currently has real multi-angle photography (each has exactly one
  photo), so with a single frame the viewer falls back to an explicitly
  labeled "360° preview (demo)" tilt effect rather than pretending to be a
  real spin. Feed it a `images` array with multiple frames and it becomes a
  real 360° viewer with no code changes.

## Admin / Content Management

**Status: Foundation only.**

- `/admin` is read-only: it reflects real counts from `catalogService` and
  `inquiryService`, but every "Add" / "Edit" action is disabled.
- **No authentication guard exists on this route.** Do not deploy it publicly
  as-is — add auth/authorization before exposing `/admin` outside a trusted
  environment.
- **To go to production:** wire the disabled buttons to real forms once the
  catalog is backed by an actual database, and gate the route behind an
  admin-only auth check.

## Payments

**Status: Intentionally not implemented.**

- The business model for this phase is enquiry/visit-store, not checkout —
  see the CTAs across product pages (`Enquire`, `Check Availability`,
  `Try It On`) instead of a cart/buy flow.
- No fake payment UI, mock gateway, or placeholder Razorpay/UPI credentials
  exist anywhere in the codebase.
- **When ready to add payments:** introduce a `PaymentService` boundary
  (mirroring `catalogService`/`inquiryService`) so cart → checkout → payment
  verification → order creation stays isolated from product/UI code, then
  wire it to Razorpay/UPI once credentials are available.

## Authentication

**Status: Production-ready for what it does, limited in scope.**

- Google OAuth login (`src/components/GoogleLoginButton.jsx`,
  `src/components/AuthContext.jsx`) works and persists a session in
  `localStorage`.
- There's no server-side session/authorization layer yet — it's client-side
  identity only. Fine for personalizing wishlist ownership later; not
  sufficient on its own to gate something like `/admin`.
