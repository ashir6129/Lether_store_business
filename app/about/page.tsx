import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FilmGrain from "@/components/FilmGrain";

export const metadata: Metadata = {
  title: "About Us & Our Craft — VERGE Studio",
  description: "Learn about our dedication to full-grain leather, Portuguese and Italian artisan ateliers, and built-for-life philosophy.",
};

export default function AboutPage() {
  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "5rem clamp(1.25rem, 5vw, 4rem) 4rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            The Verge Philosophy
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "var(--heading)",
              marginBottom: "1.25rem",
            }}
          >
            Built to Break In.<br />Not to Break Down.
          </h1>
          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--body)",
              lineHeight: 1.65,
            }}
          >
            We reject fast fashion and synthetic composites. VERGE was born out of an obsession with full-grain hides, heavy brass hardware, and double-stitched seams built for decades of wear.
          </p>
        </section>

        {/* Pillars Section */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem clamp(1.25rem, 4vw, 3rem)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
            }}
          >
            {/* Pillar 1 */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "4px" }}>
              <span className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
                01 · Material Sourcing
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                Full-Grain Hides Only
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.6 }}>
                Every jacket, glove, and boot begins with full-grain leather sourced from certified European tanneries. We preserve the hide's natural surface so it develops a rich, distinct patina unique to its owner.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "4px" }}>
              <span className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
                02 · Artisanal Assembly
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                Small-Batch Ateliers
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.6 }}>
                Our products are assembled by master leather artisans in Porto and Tuscany with decades of heritage expertise. Each piece is cut, aligned, and stitched by hand with reinforced high-wear seams.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "4px" }}>
              <span className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
                03 · The Lifetime Pact
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                Restoration & Guarantee
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.6 }}>
                We believe true luxury is longevity. Every VERGE piece carries our lifetime guarantee on structural seams and solid brass zippers. If a seam gives way, we repair it free of charge.
              </p>
            </div>
          </div>
        </section>

        {/* Storytelling Quote / Image section */}
        <section
          style={{
            background: "var(--heading)",
            color: "#f4ede3",
            padding: "6rem clamp(1.25rem, 5vw, 4rem)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p className="label-brass" style={{ color: "var(--brass)", marginBottom: "1.25rem" }}>
              Our Commitment
            </p>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                fontStyle: "italic",
                marginBottom: "2rem",
              }}
            >
              "A great leather jacket or item isn't complete when it leaves our studio — it only begins its life when you wear it into your journey."
            </blockquote>
            <p style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,237,227,0.6)" }}>
              — Marcus Thorne, Founder & Lead Artisan
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", padding: "5rem 2rem 6rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "1.25rem" }}>
            Experience the Collection
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products" className="btn btn-dark">
              Explore All Products
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Customer Care
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
