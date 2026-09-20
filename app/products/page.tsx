import { Suspense } from "react";
import type { Metadata } from "next";
import ShopCatalog from "@/components/ShopCatalog";
import FilmGrain from "@/components/FilmGrain";

export const metadata: Metadata = {
  title: "Shop All Products — VERGE Studio",
  description: "Browse the full collection of handcrafted full-grain leather jackets, apparel, footwear, and artisan accessories.",
};

export default function ProductsPage() {
  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Banner Hero */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "4rem clamp(1.25rem, 5vw, 4rem) 3.5rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            Handcrafted Collection
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
            The Full Catalog
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
            Explore our complete lineup of full-grain leather jackets, apparel, and artisan accessories. Built to break in and engineered to last.
          </p>
        </section>

        {/* Shop Catalog with Client Filters */}
        <Suspense fallback={<div style={{ padding: "5rem", textAlign: "center" }}>Loading Catalog...</div>}>
          <ShopCatalog />
        </Suspense>
      </div>
    </>
  );
}
