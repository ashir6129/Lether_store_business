"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <article
        style={{ cursor: "pointer" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: "var(--bg-card)",
            marginBottom: "1.25rem",
            transition: "transform 0.4s ease",
          }}
        >
          <Image
            src={product.images.hero}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover", transition: "opacity 0.5s ease, transform 0.6s ease" }}
            className="card-img-front"
          />
          <Image
            src={product.images.angle2}
            alt={`${product.name} — alternate`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover", opacity: 0, transition: "opacity 0.5s ease" }}
            className="card-img-back"
          />

          {/* Badges */}
          <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2, display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {product.new && (
              <span style={{
                background: "var(--brass)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.3rem 0.65rem",
              }}>New</span>
            )}
            {product.featured && !product.new && (
              <span style={{
                background: "var(--heading)",
                color: "var(--bg)",
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.3rem 0.65rem",
              }}>Bestseller</span>
            )}
          </div>

          {/* Quick view overlay */}
          <div
            className="card-overlay"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(244,237,227,0.94)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "52px",
              transform: "translateY(100%)",
              transition: "transform 0.3s ease",
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--heading)",
            }}
          >
            View Jacket →
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--heading)",
              }}
            >
              {product.name}
            </h3>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 500, color: "var(--body)", flexShrink: 0 }}>
              {product.price}
            </span>
          </div>
          <p className="label" style={{ color: "var(--muted)" }}>
            {product.category}
            {product.gender === "womens" && " — Women's"}
          </p>
        </div>
      </article>

      <style>{`
        article:hover .card-img-front { transform: scale(1.04); }
        article:hover .card-img-back  { opacity: 1 !important; }
        article:hover .card-overlay   { transform: translateY(0) !important; }
        article { transition: transform 0.35s ease; }
      `}</style>
    </Link>
  );
}

interface GridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  id?: string;
  columns?: number;
}

export default function ProductGrid({ products, title, subtitle, id, columns = 4 }: GridProps) {
  return (
    <section
      id={id}
      style={{
        background: "var(--bg)",
        padding: "5.5rem clamp(1.25rem, 5vw, 4rem)",
      }}
    >
      {(title || subtitle) && (
        <header style={{ maxWidth: "520px", marginBottom: "3rem" }}>
          <span className="label" style={{ display: "block", marginBottom: "0.75rem" }}>
            {subtitle ? "Collection" : ""}
          </span>
          {title && (
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--heading)",
                marginBottom: subtitle ? "0.75rem" : 0,
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--body)", lineHeight: 1.75 }}>
              {subtitle}
            </p>
          )}
        </header>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${Math.round(1200 / columns)}px, 100%), 1fr))`,
          gap: "2.25rem 1.5rem",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
