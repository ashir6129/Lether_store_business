"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, getCategories, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ShopCatalog({ initialCategory }: { initialCategory?: string }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCat = searchParams.get("category") || initialCategory || "all";

  const [category, setCategory] = useState<string>(initialCat);
  const [gender, setGender]     = useState<string>("all");
  const [search, setSearch]     = useState<string>(initialSearch);
  const [sort, setSort]         = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const { addItem } = useCart();
  const categories  = useMemo(() => getCategories(), []);

  useEffect(() => {
    const s = searchParams.get("search");
    if (s !== null) setSearch(s);
    const c = searchParams.get("category");
    if (c !== null) setCategory(c);
  }, [searchParams]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.categorySlug === category);
    }

    if (gender !== "all") {
      result = result.filter((p) => p.gender === gender || p.gender === "unisex");
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.material.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.numericPrice <= maxPrice);

    if (sort === "price-asc") {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sort === "newest") {
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [category, gender, search, maxPrice, sort]);

  return (
    <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "3rem clamp(1.25rem, 4vw, 3rem) 6rem" }}>
      {/* Search & Filter Header Bar */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "1.5rem 1.75rem",
          marginBottom: "3rem",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Top row: Category Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <span className="label" style={{ marginRight: "0.75rem", color: "var(--muted)" }}>
            Category:
          </span>
          <button
            onClick={() => setCategory("all")}
            className={`cat-pill ${category === "all" ? "active" : ""}`}
          >
            All Products ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`cat-pill ${category === c.slug ? "active" : ""}`}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>

        {/* Second row: Search, Gender, Sort, Max Price */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Search */}
          <div>
            <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Filter items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.45rem 0.75rem",
                color: "var(--heading)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
              Department
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.45rem 0.75rem",
                color: "var(--heading)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                outline: "none",
              }}
            >
              <option value="all">All Departments</option>
              <option value="mens">Men's Collection</option>
              <option value="womens">Women's Collection</option>
              <option value="unisex">Unisex Items</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.45rem 0.75rem",
                color: "var(--heading)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                outline: "none",
              }}
            >
              <option value="featured">Featured First</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
                Max Price
              </label>
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>£{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--brass)" }}
            />
          </div>
        </div>
      </div>

      {/* Filter summary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <p className="label-brass" style={{ fontSize: "0.75rem" }}>
          Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {(category !== "all" || gender !== "all" || search || maxPrice < 500) && (
          <button
            onClick={() => {
              setCategory("all");
              setGender("all");
              setSearch("");
              setMaxPrice(500);
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--brass)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ padding: "6rem 2rem", textAlign: "center", background: "var(--bg-card)", border: "1px dashed var(--border)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1rem" }}>
            No products match your criteria
          </h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
            Try expanding your search term, clearing filters, or choosing another category.
          </p>
          <button
            onClick={() => {
              setCategory("all");
              setGender("all");
              setSearch("");
              setMaxPrice(1200);
            }}
            className="btn btn-dark"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2.5rem 2rem",
          }}
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} onQuickAdd={() => addItem({ slug: p.slug, name: p.name, price: p.price, size: p.sizes[0] || "M", image: p.images.hero })} />
          ))}
        </div>
      )}

      <style>{`
        .cat-pill {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.4rem 0.85rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--body);
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-pill:hover {
          border-color: var(--brass);
          color: var(--heading);
        }
        .cat-pill.active {
          background: var(--heading);
          color: #fff;
          border-color: var(--heading);
        }
      `}</style>
    </section>
  );
}

function ProductCard({ product, onQuickAdd }: { product: Product; onQuickAdd: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Image box */}
      <Link
        href={`/products/${product.slug}`}
        style={{
          position: "relative",
          aspectRatio: "3/4",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          display: "block",
          marginBottom: "1rem",
        }}
      >
        <Image
          src={hovered && product.images.angle2 ? product.images.angle2 : product.images.hero}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {product.new && (
            <span
              style={{
                background: "var(--brass)",
                color: "#fff",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "2px",
              }}
            >
              New
            </span>
          )}
          <span
            style={{
              background: "rgba(24,18,14,0.75)",
              color: "#f4ede3",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "2px 8px",
              borderRadius: "2px",
              backdropFilter: "blur(4px)",
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Quick Add Button overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            right: "12px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.25s ease",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickAdd();
            }}
            className="btn btn-dark"
            style={{ width: "100%", padding: "0.5rem", fontSize: "0.72rem" }}
          >
            + Quick Add ({product.price})
          </button>
        </div>
      </Link>

      {/* Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: "0.25rem",
            }}
          >
            <Link href={`/products/${product.slug}`} style={{ color: "var(--heading)", textDecoration: "none" }}>
              {product.name}
            </Link>
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.4 }}>{product.tagline}</p>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--heading)",
            marginLeft: "1rem",
          }}
        >
          {product.price}
        </div>
      </div>
    </div>
  );
}
