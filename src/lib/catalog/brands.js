// Brand directory carried by StyleSphere.
//
// PROTOTYPE DATA: hard-coded here for now. In production this becomes a
// `brands` table managed from the admin CMS (see src/app/admin).
// ClothHive is a real logo asset bundled with the project (public/logo.svg);
// the others use a typographic monogram (see BrandMark component) until real
// brand marks are supplied.
export const BRANDS = [
  {
    id: "clothhive",
    slug: "clothhive",
    name: "ClothHive",
    tagline: "Bold streetwear, everyday essentials.",
    description:
      "ClothHive channels street culture into wardrobe staples — graphic tees, relaxed shirting, and easy layers built for how the city actually moves.",
    aesthetic: "Streetwear",
    logo: "/logo.svg",
    accent: "#db2777",
    categories: ["tshirts", "shirts"],
  },
  {
    id: "maison-verre",
    slug: "maison-verre",
    name: "Maison Verre",
    tagline: "Quiet luxury, considered basics.",
    description:
      "Maison Verre is StyleSphere's minimalist shirting house — clean lines, considered fabrics, and a restrained palette designed to outlast trends.",
    aesthetic: "Minimal & Editorial",
    logo: null,
    accent: "#111827",
    categories: ["shirts"],
  },
  {
    id: "norden-co",
    slug: "norden-co",
    name: "Norden & Co.",
    tagline: "Heritage outerwear for modern climates.",
    description:
      "Norden & Co. builds jackets the way outfitters used to — durable construction, weather-ready fabrics, and a heritage silhouette reworked for city life.",
    aesthetic: "Heritage Outerwear",
    logo: null,
    accent: "#1e3a5f",
    categories: ["jackets"],
  },
  {
    id: "ardent",
    slug: "ardent",
    name: "Ardent",
    tagline: "Sharp tailoring, modern silhouettes.",
    description:
      "Ardent brings tailoring instincts to off-the-rack pieces — structured shirts and jackets cut for a sharper, more deliberate silhouette.",
    aesthetic: "Modern Tailoring",
    logo: null,
    accent: "#7c2d12",
    categories: ["shirts", "jackets"],
  },
];

export function getBrandMeta(slug) {
  return BRANDS.find((b) => b.slug === slug) || null;
}
