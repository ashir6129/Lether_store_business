import type { Metadata } from "next";
import Link from "next/link";
import { getNew } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import FilmGrain from "@/components/FilmGrain";

export const metadata: Metadata = {
  title: "New Arrivals — VERGE Studio",
  description: "Discover our latest drops in full-grain leather jackets, apparel, and artisan accessories.",
};

export default function NewArrivalsPage() {
  const newItems = getNew();

  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Header */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "4.5rem clamp(1.25rem, 5vw, 4rem) 4rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            Fresh Drops · Limited Batches
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--heading)",
              marginBottom: "1rem",
            }}
          >
            New Arrivals
          </h1>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--body)",
              lineHeight: 1.6,
            }}
          >
            Explore our latest release of handcrafted leather silhouettes and seasonal accessories. Produced in small artisanal runs.
          </p>
        </section>

        {/* Product Grid */}
        <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "4rem clamp(1.25rem, 4vw, 3rem) 6rem" }}>
          <ProductGrid products={newItems} />

          <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px dashed var(--border)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.25rem" }}>
              Looking for our complete catalog?
            </p>
            <Link href="/products" className="btn btn-dark">
              Shop All Products
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
