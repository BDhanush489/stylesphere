// Deterministically derives a full product record from a bundled image file.
//
// PROTOTYPE DATA LAYER: there is no products table yet, so attributes
// (brand, price, material, sizes, tags...) are generated from a hash of the
// filename rather than stored. The hash makes the output stable across
// requests/restarts. Replace this whole module with a real `products` table
// once the admin CMS can manage inventory directly.
import { CATEGORY_LABELS } from "./localImages";
import { BRANDS } from "./brands";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickFrom(list, hash, salt = 0) {
  return list[(hash + salt) % list.length];
}

const BRAND_PICKERS = {
  jackets: (index, hash) => (hash % 4 === 0 ? "ardent" : "norden-co"),
  tshirts: () => "clothhive",
  shirts: (index, hash) => {
    const r = hash % 5;
    if (r === 0 || r === 1) return "maison-verre";
    if (r === 2 || r === 3) return "ardent";
    return "clothhive";
  },
};

const MATERIALS = {
  shirts: ["100% Cotton", "Cotton-Linen Blend", "Oxford Cotton", "Brushed Flannel"],
  tshirts: ["Combed Cotton Jersey", "Cotton-Modal Blend", "Organic Cotton"],
  jackets: ["Waxed Cotton", "Wool Blend", "Technical Nylon Shell", "Quilted Poly-Fill"],
};

const FITS = ["Slim Fit", "Regular Fit", "Relaxed Fit", "Tailored Fit"];

const COLORS = ["Black", "Charcoal", "Navy", "Olive", "Stone", "White", "Burgundy"];

const SIZES_BY_CATEGORY = {
  shirts: ["S", "M", "L", "XL", "XXL"],
  tshirts: ["XS", "S", "M", "L", "XL"],
  jackets: ["S", "M", "L", "XL"],
};

const PRICE_RANGES = {
  shirts: [1799, 4299],
  tshirts: [899, 2199],
  jackets: [4499, 11999],
};

const TAGS_POOL = ["weekend-edit", "office-edit", "evening-edit", "streetwear", "premium-collection"];

const NAME_PARTS = {
  shirts: {
    adjectives: ["Everyday", "Classic", "Heritage", "Essential", "Refined", "Signature", "Modern", "Relaxed"],
    nouns: ["Oxford Shirt", "Poplin Shirt", "Flannel Shirt", "Linen Shirt", "Button-Down", "Overshirt", "Denim Shirt"],
  },
  tshirts: {
    adjectives: ["Core", "Everyday", "Boxy", "Classic", "Signature", "Relaxed"],
    nouns: ["Crew Tee", "Graphic Tee", "Pocket Tee", "Ringer Tee", "Long-Sleeve Tee", "Henley"],
  },
  jackets: {
    adjectives: ["Heritage", "Urban", "Field", "Storm", "Classic", "Everyday"],
    nouns: ["Bomber Jacket", "Trucker Jacket", "Field Jacket", "Overshirt Jacket", "Parka", "Windbreaker"],
  },
};

function priceFor(category, hash) {
  const [min, max] = PRICE_RANGES[category];
  return Math.round((min + (hash % (max - min))) / 10) * 10;
}

export function buildProduct({ category, filename, index }) {
  const hash = hashString(`${category}-${filename}`);
  const brandSlug = BRAND_PICKERS[category](index, hash);
  const brand = BRANDS.find((b) => b.slug === brandSlug);

  const parts = NAME_PARTS[category];
  const name = `${pickFrom(parts.adjectives, hash, 1)} ${pickFrom(parts.nouns, hash, 2)}`;

  const price = priceFor(category, hash);
  const onSale = hash % 3 === 0;
  const originalPrice = onSale ? Math.round((price * 1.25) / 10) * 10 : price;

  const availabilityRoll = hash % 10;
  const availability = availabilityRoll === 0 ? "sold_out" : availabilityRoll <= 2 ? "made_to_order" : "in_stock";

  const slug = `${category}-${String(index + 1).padStart(3, "0")}`;
  const imagePath = `/${category}/images/${filename}`;

  const tags = [pickFrom(TAGS_POOL, hash, 3)];
  const secondTag = pickFrom(TAGS_POOL, hash, 7);
  if (secondTag !== tags[0]) tags.push(secondTag);

  return {
    id: slug,
    slug,
    name,
    brandSlug,
    brandName: brand?.name || "StyleSphere",
    category,
    categoryLabel: CATEGORY_LABELS[category],
    price,
    originalPrice,
    image: imagePath,
    images: [imagePath],
    sizes: SIZES_BY_CATEGORY[category],
    color: pickFrom(COLORS, hash, 4),
    material: pickFrom(MATERIALS[category], hash, 5),
    fit: pickFrom(FITS, hash, 6),
    tags,
    availability,
    inStock: availability !== "sold_out",
    rating: Math.round((3.8 + (hash % 12) / 10) * 10) / 10,
    reviews: 8 + (hash % 260),
    isNew: hash % 3 === 0,
  };
}
