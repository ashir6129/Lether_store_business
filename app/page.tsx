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
          background: "#18120e",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Full-bleed lifestyle image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/home-hero.jpg"
            alt="Verge Studio Leather Outerwear"
            fill
            priority
            sizes="100vw"
            quality={100}
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
          {/* Subtle vignette/gradient for text legibility */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(24, 18, 14, 0.85) 0%, rgba(24, 18, 14, 0.1) 60%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(24, 18, 14, 0.95) 0%, rgba(24, 18, 14, 0.3) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Copy — bottom-left */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vh, 5rem)",
            maxWidth: "750px",
          }}
        >
          <p
            className="label-brass fade-up fade-up-1"
            style={{ display: "block", marginBottom: "1.25rem", color: "var(--brass)", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Handcrafted — Full-Grain Leather & Goods
          </p>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              color: "#ffffff",
              marginBottom: "1.5rem",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
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
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "2.5rem",
              maxWidth: "520px",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Full-grain hides, solid brass hardware, and uncompromising craftsmanship. Outerwear, footwear, and artisan goods built to break in, not break down.
          </p>
          <div
            className="fade-up fade-up-4"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <Link 
              href="/products" 
              style={{
                padding: "1rem 2rem",
                background: "var(--brass)",
                color: "#18120E",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                borderRadius: "4px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
              Shop All Products
            </Link>
            <Link 
              href="/categories/jackets" 
              style={{
                padding: "1rem 2rem",
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              Explore Jackets
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
