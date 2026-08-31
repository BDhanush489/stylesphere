// Curated collections are just saved filters over the product tag field.
// PROTOTYPE DATA: static here; in production these become editor-curated
// rows (see src/app/admin) that reference a query or an explicit product list.
export const COLLECTIONS = [
  {
    slug: "weekend-edit",
    name: "Weekend Edit",
    tag: "weekend-edit",
    description: "Easy layers and relaxed fits for time off the clock.",
  },
  {
    slug: "office-edit",
    name: "Office Edit",
    tag: "office-edit",
    description: "Sharp shirting and tailored outerwear for the workday.",
  },
  {
    slug: "evening-edit",
    name: "Evening Edit",
    tag: "evening-edit",
    description: "Elevated pieces for dinners, dates, and everything after dark.",
  },
  {
    slug: "streetwear",
    name: "Streetwear",
    tag: "streetwear",
    description: "Graphic tees and bold layers built for the street.",
  },
  {
    slug: "premium-collection",
    name: "Premium Collection",
    tag: "premium-collection",
    description: "Our most considered fabrics and finishes.",
  },
];

export function getCollectionMeta(slug) {
  return COLLECTIONS.find((c) => c.slug === slug) || null;
}
