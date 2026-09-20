// ─────────────────────────────────────────────────────────────────────────────
// Product Data Schema — VERGE Studio (Multi-Category Store)
// Easily add new products of any category (Jackets, Accessories, Footwear, Tops, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export interface CopyBeat {
  section: "hero" | "design" | "materials" | "craft" | "fit" | "cta";
  headline: string;
  subcopy: string;
  ctaLabel?: string;
  align?: "left" | "right" | "center";
}

export interface ProductImages {
  hero: string;       // Front-facing hero shot
  angle2: string;     // Back or 3/4 view
  detail1: string;    // Close-up: hardware / trim
  detail2: string;    // Close-up: stitching / interior
  side: string;       // Side profile
  extra?: string[];   // Optional additional angles
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  numericPrice: number;
  category: string;        // Display Category (e.g. "Moto Jacket", "Driving Gloves")
  categorySlug: string;    // URL Slug ("jackets", "accessories", "footwear", "tops")
  gender: "mens" | "womens" | "unisex";
  images: ProductImages;
  specs: {
    material: string;
    lining: string;
    hardware: string;
    fit: string;
    origin: string;
    [key: string]: string;
  };
  sizes: string[];
  copyBeats: CopyBeat[];
  featured?: boolean;
  new?: boolean;
  inStock?: boolean;
  description?: string;
}

export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  count: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CATALOG — Multi-Category Storefront
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ── 1. THE VOSS JACKET ───────────────────────────────────────────────────
  {
    slug: "voss-jacket",
    name: "The Voss Jacket",
    tagline: "Full-grain leather, cut for the city.",
    price: "£395",
    numericPrice: 395,
    category: "Moto Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: true,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/voss/01.jpeg",
      angle2:  "/images/voss/02.jpeg",
      detail1: "/images/voss/03.jpeg",
      detail2: "/images/voss/04.jpeg",
      side:    "/images/voss/05.jpeg",
      extra:   ["/images/voss/06.jpeg", "/images/voss/07.jpeg", "/images/voss/08.jpeg"],
    },
    specs: {
      material: "Full-grain cowhide leather",
      lining:   "Viscose satin lining",
      hardware: "Solid-pull brass YKK zippers",
      fit:      "Slim, tailored through the body",
      origin:   "Handcrafted in Portugal",
    },
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    copyBeats: [
      {
        section:  "hero",
        headline: "The Voss Jacket",
        subcopy:  "A café-racer silhouette in full-grain leather — built to break in, not break down.",
        align:    "center",
      },
      {
        section:  "design",
        headline: "A silhouette with intent.",
        subcopy:  "A band collar, asymmetric zip, and raglan seams keep the cut close without restricting movement — heritage moto styling, refined for everyday wear.",
        align:    "left",
      },
      {
        section:  "materials",
        headline: "Full-grain leather. Real hardware.",
        subcopy:  "Each hide is selected for grain and hand-feel, then finished for a natural sheen that deepens with wear. Solid-pull brass zippers and snap hardware are built to outlast the season.",
        align:    "right",
      },
      {
        section:  "craft",
        headline: "Detail, not decoration.",
        subcopy:  "Quilted panel inserts reinforce high-wear points. Every seam is finished clean, inside and out — because the inside of a jacket tells you everything about how it was made.",
        align:    "left",
      },
      {
        section:  "fit",
        headline: "Cut to move.",
        subcopy:  "A close, tailored fit through the body with just enough room to layer — this is a jacket built for actually wearing, not just standing in.",
        align:    "center",
      },
      {
        section:   "cta",
        headline:  "Wear it in. Wear it out.",
        subcopy:   "The Voss Jacket. Full-grain leather, built to last a lifetime.",
        ctaLabel:  "Shop The Voss",
        align:     "center",
      },
    ],
  },

  // ── 2. THE CHASE JACKET ──────────────────────────────────────────────────
  {
    slug: "chase-jacket",
    name: "The Chase Jacket",
    tagline: "Clean lines. Relentless finish.",
    price: "£450",
    numericPrice: 450,
    category: "Racer Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: true,
    new: true,
    inStock: true,
    images: {
      hero:    "/images/chase/01.jpeg",
      angle2:  "/images/chase/02.jpeg",
      detail1: "/images/chase/03.jpeg",
      detail2: "/images/chase/04.jpeg",
      side:    "/images/chase/05.jpeg",
      extra:   ["/images/chase/06.jpeg", "/images/chase/07.jpeg", "/images/chase/08.jpeg"],
    },
    specs: {
      material: "Heavyweight steerhide leather",
      lining:   "Custom jacquard twill lining",
      hardware: "Matte-black nickel zippers",
      fit:      "Regular, athletic shoulder cut",
      origin:   "Handcrafted in Italy",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    copyBeats: [
      {
        section:  "hero",
        headline: "The Chase Jacket",
        subcopy:  "Minimalist structure engineered for maximum endurance.",
        align:    "center",
      },
      {
        section:  "design",
        headline: "Stripped of the unnecessary.",
        subcopy:  "Flat front storm flap, hidden waist adjustments, and clean hand-warmer pockets.",
        align:    "left",
      },
      {
        section:  "materials",
        headline: "Vegetable-tanned steerhide.",
        subcopy:  "Deep oil-wax treatment gives this leather exceptional water resistance and rich patina.",
        align:    "right",
      },
      {
        section:   "cta",
        headline:  "The Chase is on.",
        subcopy:   "Precision cut steerhide racer jacket.",
        ctaLabel:  "Shop The Chase",
        align:     "center",
      },
    ],
  },

  // ── 3. THE MARA MOTO (WOMENS) ────────────────────────────────────────────
  {
    slug: "female-leather-jacket",
    name: "The Mara Moto",
    tagline: "Sculpted fit, supple grain.",
    price: "£380",
    numericPrice: 380,
    category: "Womens Moto",
    categorySlug: "jackets",
    gender: "womens",
    featured: true,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/mara/01.jpeg",
      angle2:  "/images/mara/02.jpeg",
      detail1: "/images/mara/03.jpeg",
      detail2: "/images/mara/04.jpeg",
      side:    "/images/mara/05.jpeg",
      extra:   ["/images/mara/06.jpeg"],
    },
    specs: {
      material: "Ultra-soft lambskin leather",
      lining:   "Breathable cupro silk-touch lining",
      hardware: "Polished gunmetal zippers",
      fit:      "Cropped tailored fit",
      origin:   "Handcrafted in Spain",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    copyBeats: [
      {
        section:  "hero",
        headline: "The Mara Moto",
        subcopy:  "Effortless elegance carved from butter-soft lambskin.",
        align:    "center",
      },
      {
        section:  "design",
        headline: "Designed for drape.",
        subcopy:  "Articulated elbows and action-back pleats adapt smoothly to every body motion.",
        align:    "left",
      },
      {
        section:   "cta",
        headline:  "Elevate your outerwear.",
        subcopy:   "The Mara Moto lambskin jacket.",
        ctaLabel:  "Shop The Mara",
        align:     "center",
      },
    ],
  },

  // ── 4. THE INCLINE JACKET ────────────────────────────────────────────────
  {
    slug: "incline-jacket",
    name: "The Incline Flight",
    tagline: "Shearling-trimmed cold defender.",
    price: "£420",
    numericPrice: 420,
    category: "Flight Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: false,
    new: true,
    inStock: true,
    images: {
      hero:    "/images/incline/01.jpeg",
      angle2:  "/images/incline/02.jpeg",
      detail1: "/images/incline/03.jpeg",
      detail2: "/images/incline/04.jpeg",
      side:    "/images/incline/05.jpeg",
    },
    specs: {
      material: "Waxy pull-up horsehide",
      lining:   "Quilted thermal insulation",
      hardware: "Heavy-duty brass buckles & zip",
      fit:      "Boxy flight cut",
      origin:   "Handcrafted in Scotland",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    copyBeats: [
      {
        section:  "hero",
        headline: "The Incline Flight",
        subcopy:  "Built to withstand high altitudes and harsh winters.",
        align:    "center",
      },
    ],
  },

  // ── 5. THE ROBERTS MOTO ──────────────────────────────────────────────────
  {
    slug: "roberts-motorcycle-jacket",
    name: "The Roberts Moto",
    tagline: "Heritage café racer with padded shoulders.",
    price: "£365",
    numericPrice: 365,
    category: "Café Racer",
    categorySlug: "jackets",
    gender: "mens",
    featured: false,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/roberts/01.jpeg",
      angle2:  "/images/roberts/02.jpeg",
      detail1: "/images/roberts/03.jpeg",
      detail2: "/images/roberts/04.jpeg",
      side:    "/images/roberts/05.jpeg",
    },
    specs: {
      material: "Aniline full-grain cowhide",
      lining:   "Tartan cotton body, satin sleeves",
      hardware: "Antiqued brass hardware",
      fit:      "Classic moto rider fit",
      origin:   "Handcrafted in England",
    },
    sizes: ["S", "M", "L", "XL"],
    copyBeats: [],
  },

  // ── 6. THE TAMAR MOTO ────────────────────────────────────────────────────
  {
    slug: "tamar-motorcycle-jacket",
    name: "The Tamar Jacket",
    tagline: "Double-rider silhouette with removable belt.",
    price: "£485",
    numericPrice: 485,
    category: "Asymmetric Moto",
    categorySlug: "jackets",
    gender: "unisex",
    featured: true,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/tamar/01.jpeg",
      angle2:  "/images/tamar/02.jpeg",
      detail1: "/images/tamar/03.jpeg",
      detail2: "/images/tamar/04.jpeg",
      side:    "/images/tamar/05.jpeg",
    },
    specs: {
      material: "Heavy gauge calfskin",
      lining:   "Heavy duty red satin",
      hardware: "Custom cast solid steel hardware",
      fit:      "Relaxed double rider",
      origin:   "Handcrafted in Portugal",
    },
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    copyBeats: [],
  },

  // ── 7. THE TOURER SHIRT JACKET ───────────────────────────────────────────
  {
    slug: "tourer-shirt",
    name: "The Tourer Shirt Jacket",
    tagline: "Lightweight utility overshirt in oiled leather.",
    price: "£345",
    numericPrice: 345,
    category: "Shirt Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: false,
    new: true,
    inStock: true,
    images: {
      hero:    "/images/tourer/01.jpeg",
      angle2:  "/images/tourer/02.jpeg",
      detail1: "/images/tourer/03.jpeg",
      detail2: "/images/tourer/04.jpeg",
      side:    "/images/tourer/05.jpeg",
    },
    specs: {
      material: "0.9mm lightweight lambskin",
      lining:   "Unlined suede interior",
      hardware: "Horn button closures",
      fit:      "Relaxed overshirt fit",
      origin:   "Handcrafted in Italy",
    },
    sizes: ["S", "M", "L", "XL"],
    copyBeats: [],
  },

  // ── 8. THE TRAIL MASTER ──────────────────────────────────────────────────
  {
    slug: "trail-master-motorcycle-jacket",
    name: "The Trail Master",
    tagline: "Four-pocket field jacket built for overland exploration.",
    price: "£495",
    numericPrice: 495,
    category: "Field Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: true,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/trail-master/01.jpeg",
      angle2:  "/images/trail-master/02.jpeg",
      detail1: "/images/trail-master/03.jpeg",
      detail2: "/images/trail-master/04.jpeg",
      side:    "/images/trail-master/05.jpeg",
    },
    specs: {
      material: "Waxed full-grain steerhide",
      lining:   "Removable wool plaid lining",
      hardware: "Solid brass snaps and zip",
      fit:      "Regular, waist belted",
      origin:   "Handcrafted in Scotland",
    },
    sizes: ["M", "L", "XL", "XXL"],
    copyBeats: [],
  },

  // ── 9. THE BLACK LEATHER RIDER ───────────────────────────────────────────
  {
    slug: "black-leather-jacket",
    name: "The Solstice Rider",
    tagline: "Timeless minimalist biker jacket.",
    price: "£370",
    numericPrice: 370,
    category: "Classic Leather",
    categorySlug: "jackets",
    gender: "unisex",
    featured: false,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/brecon-moto/01.jpeg",
      angle2:  "/images/brecon-moto/02.jpeg",
      detail1: "/images/brecon-moto/03.jpeg",
      detail2: "/images/brecon-moto/04.jpeg",
      side:    "/images/brecon-moto/05.jpeg",
    },
    specs: {
      material: "Semi-aniline nappa leather",
      lining:   "Black cotton stretch twill",
      hardware: "Silver-finish YKK zippers",
      fit:      "Slim athletic fit",
      origin:   "Handcrafted in Portugal",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    copyBeats: [],
  },

  // ── 10. THE BRECON BOMBER ────────────────────────────────────────────────
  {
    slug: "brecon-motorcycle-bomber-jacket",
    name: "The Brecon Bomber",
    tagline: "Ribbed waist & collar bomber in oiled hide.",
    price: "£410",
    numericPrice: 410,
    category: "Bomber Jacket",
    categorySlug: "jackets",
    gender: "mens",
    featured: false,
    new: false,
    inStock: true,
    images: {
      hero:    "/images/brecon-bomber/01.jpeg",
      angle2:  "/images/brecon-bomber/02.jpeg",
      detail1: "/images/brecon-bomber/03.jpeg",
      detail2: "/images/brecon-bomber/04.jpeg",
      side:    "/images/brecon-bomber/05.jpeg",
    },
    specs: {
      material: "Oiled bullhide leather",
      lining:   "Heavyweight rib knit trim & satin lining",
      hardware: "Brass antique zippers",
      fit:      "Relaxed bomber cut",
      origin:   "Handcrafted in Portugal",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    copyBeats: [],
  },

  // ── 11. ARTISAN DRIVING GLOVES (ACCESSORIES) ─────────────────────────────
  {
    slug: "heritage-driving-gloves",
    name: "Artisan Leather Driving Gloves",
    tagline: "Cognac brown unlined leather gloves with brass snaps.",
    price: "£145",
    numericPrice: 145,
    category: "Accessories",
    categorySlug: "accessories",
    gender: "unisex",
    featured: true,
    new: true,
    inStock: true,
    images: {
      hero:    "/images/extra/gloves.png",
      angle2:  "/images/extra/gloves.png",
      detail1: "/images/extra/gloves.png",
      detail2: "/images/extra/gloves.png",
      side:    "/images/extra/gloves.png",
    },
    specs: {
      material: "Full-grain Cognac Cowhide",
      lining:   "Unlined for tactile grip",
      hardware: "Solid brass wrist snaps",
      fit:      "Snug ergonomic curve",
      origin:   "Handcrafted in Portugal",
    },
    sizes: ["S", "M", "L", "XL"],
    copyBeats: [],
  },
];

// ── Categories Metadata ────────────────────────────────────────────────────
export const categoriesMeta: Record<string, { name: string; description: string }> = {
  jackets: {
    name: "Jackets & Outerwear",
    description: "Full-grain leather moto, café racer, and flight jackets built to break in and last a lifetime.",
  },
  accessories: {
    name: "Artisan Accessories",
    description: "Handcrafted leather accessories, driving gloves, and care essentials for the discerning rider.",
  },
  footwear: {
    name: "Heritage Footwear",
    description: "Goodyear-welted boots and footwear crafted from premium hides.",
  },
  tops: {
    name: "Shirts & Overshirts",
    description: "Supple suede overshirts and utility shirt jackets designed for seamless layering.",
  },
};

// ── Query Helpers ──────────────────────────────────────────────────────────
export function getProduct(slug: string): Product | undefined {
  const norm = slug.toLowerCase().trim();
  const directMatch = products.find(
    (p) =>
      p.slug === norm ||
      p.slug === `${norm}-jacket` ||
      p.slug === `${norm}-motorcycle-jacket` ||
      (norm === "mara-jacket" && p.slug === "female-leather-jacket") ||
      (norm === "tamar-jacket" && p.slug === "tamar-motorcycle-jacket") ||
      (norm === "roberts-jacket" && p.slug === "roberts-motorcycle-jacket") ||
      (norm === "trail-master" && p.slug === "trail-master-motorcycle-jacket") ||
      (norm === "brecon-bomber" && p.slug === "brecon-motorcycle-bomber-jacket") ||
      (norm === "the-classic-biker" && p.slug === "voss-jacket") ||
      (norm === "classic-biker" && p.slug === "voss-jacket") ||
      (norm === "biker-jacket" && p.slug === "voss-jacket")
  );
  return directMatch || products[0];
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategories(): CategoryMeta[] {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  });

  return Object.keys(categoriesMeta).map((slug) => ({
    slug,
    name: categoriesMeta[slug].name,
    description: categoriesMeta[slug].description,
    count: counts[slug] || 0,
  }));
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNew(): Product[] {
  return products.filter((p) => p.new);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.material.toLowerCase().includes(q)
  );
}

export interface FilterOptions {
  categorySlug?: string;
  gender?: "mens" | "womens" | "unisex" | "all";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "newest";
}

export function filterProducts(options: FilterOptions): Product[] {
  let list = [...products];

  if (options.categorySlug && options.categorySlug !== "all") {
    list = list.filter((p) => p.categorySlug === options.categorySlug);
  }

  if (options.gender && options.gender !== "all") {
    list = list.filter((p) => p.gender === options.gender || p.gender === "unisex");
  }

  if (options.minPrice !== undefined) {
    list = list.filter((p) => p.numericPrice >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    list = list.filter((p) => p.numericPrice <= options.maxPrice!);
  }

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.material.toLowerCase().includes(q)
    );
  }

  if (options.sort === "price-asc") {
    list.sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (options.sort === "price-desc") {
    list.sort((a, b) => b.numericPrice - a.numericPrice);
  } else if (options.sort === "newest") {
    list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  } else {
    // featured sort default
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return list;
}
