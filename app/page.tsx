import Image from "next/image";
import Link from "next/link";
import { products, getFeatured, getNew, getCategories } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import FilmGrain from "@/components/FilmGrain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERGE — Premium Leather Outerwear, Apparel & Goods",
  description:
    "Full-grain leather moto jackets, apparel, footwear, and artisan accessories, handcrafted for the long haul. Built to last a lifetime.",
};

export default function Home() {
  const featured  = getFeatured();
  const newItems  = getNew();
  const categories = getCategories();
  const heroJacket = products.find((p) => p.slug === "voss-jacket") ?? products[0];
  const secondJacket = products.find((p) => p.slug === "mara-jacket") ?? products[1];
  const thirdJacket  = products.find((p) => p.slug === "trail-master") ?? products[2];

  return (
    <>
      <FilmGrain />

      {/* ────────────────────────────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: "640px",
          background: "var(--bg)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Full-bleed product image — right-weighted */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "62%", height: "100%", flexShrink: 0 }}>
            <Image
              src={heroJacket.images.hero}
              alt={heroJacket.name}
              fill
              priority
              sizes="62vw"
              quality={90}
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />
          </div>
          {/* Left fade */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, var(--bg) 18%, rgba(244,237,227,0.6) 45%, transparent 70%)",
            }}
          />
          {/* Bottom fade */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, transparent, var(--bg))",
            }}
          />
        </div>

        {/* Copy — bottom-left */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vh, 5rem)",
            maxWidth: "700px",
          }}
        >
          <p
            className="label-brass fade-up fade-up-1"
            style={{ display: "block", marginBottom: "1.25rem" }}
          >
            Handcrafted — Full-Grain Leather & Goods
          </p>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              color: "var(--heading)",
              marginBottom: "1.5rem",
            }}
          >
            Built for<br />the Long Haul.
          </h1>
          <p
            className="fade-up fade-up-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--body)",
              marginBottom: "2.5rem",
              maxWidth: "520px",
            }}
          >
            Full-grain hides, solid brass hardware, and Portuguese craftsmanship. Outerwear, footwear, and artisan goods built to break in, not break down.
          </p>
          <div
            className="fade-up fade-up-4"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <Link href="/products" className="btn btn-dark">
              Shop All Products
            </Link>
            <Link href={`/products/${heroJacket.slug}`} className="btn btn-outline">
              Explore The Voss — {heroJacket.price}
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          CATEGORY SHOWCASE TILES
      ──────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "5rem clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="label-brass" style={{ display: "block", marginBottom: "0.5rem" }}>
              Studio Categories
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 400 }}>
              Crafted Across Collections
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  padding: "2.25rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "220px",
                }}
                className="category-card"
              >
                <div>
                  <span className="label-brass" style={{ fontSize: "0.68rem" }}>
                    {cat.count} Item{cat.count !== 1 ? "s" : ""}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 500,
                      color: "var(--heading)",
                      marginTop: "0.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--body)", lineHeight: 1.5 }}>
                    {cat.description}
                  </p>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brass)" }}>
                  <span>Explore Collection</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          FEATURED PRODUCTS
      ──────────────────────────────────────────────────────────────────── */}
      <section
        id="catalog"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "6rem clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p className="label-brass" style={{ display: "block", marginBottom: "0.5rem" }}>
              Signature Pieces
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "var(--heading)",
              }}
            >
              Featured Selection
            </h2>
          </div>
          <Link href="/products" className="btn btn-outline">
            View Full Catalog ({products.length})
          </Link>
        </div>

        <ProductGrid products={featured} />
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          EDITORIAL BREAKAWAY
      ──────────────────────────────────────────────────────────────────── */}
      <section
        id="materials"
        style={{
          background: "var(--heading)",
          color: "#f4ede3",
          padding: "7rem clamp(1.25rem, 6vw, 5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="label-brass" style={{ color: "var(--brass)", marginBottom: "1.25rem" }}>
              Materials & Craftsmanship
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "1.75rem",
                color: "#fff",
              }}
            >
              We start where others stop.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "rgba(244,237,227,0.8)",
                marginBottom: "2rem",
              }}
            >
              Every hide selected for VERGE is full-grain cowhide or steerhide, drum-dyed and finished to preserve the original character of the skin. Solid brass hardware, heavy cotton twill pocketing, and reinforced stress points ensure your investment only gets better with time.
            </p>
            <Link href="/about" className="btn btn-brass">
              Read Our Story & Guarantee
            </Link>
          </div>

          <div
            style={{
              position: "relative",
              aspectRatio: "4/5",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Image
              src={secondJacket.images.detail1}
              alt="Detail craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          NEW ARRIVALS SECTION
      ──────────────────────────────────────────────────────────────────── */}
      <section
        id="new"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "6rem clamp(1.25rem, 5vw, 4rem) 7rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p className="label-brass" style={{ display: "block", marginBottom: "0.5rem" }}>
              Latest Drops
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "var(--heading)",
              }}
            >
              New Arrivals
            </h2>
          </div>
          <Link href="/new" className="btn btn-dark">
            Explore All New Items
          </Link>
        </div>

        <ProductGrid products={newItems} />
      </section>

      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--brass) !important;
        }
      `}</style>
    </>
  );
}
