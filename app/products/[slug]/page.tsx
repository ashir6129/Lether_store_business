import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import ScrollHero from "@/components/ScrollHero";
import ProductGrid from "@/components/ProductGrid";
import FilmGrain from "@/components/FilmGrain";
import SizeSelector from "@/components/SizeSelector";
import PhotoGallery from "@/components/PhotoGallery";

/* ── Static params ───────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* ── Per-page metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title:       `${p.name} — VERGE Studio`,
    description: `${p.tagline} Handcrafted ${p.specs.material}. Priced at ${p.price}.`,
    openGraph:   { title: p.name, description: p.tagline, images: [p.images.hero] },
  };
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug && (p.categorySlug === product.categorySlug || p.featured)).slice(0, 4);

  const allImages = [
    product.images.hero,
    product.images.angle2,
    product.images.detail1,
    product.images.detail2,
    product.images.side,
    ...(product.images.extra ?? []),
  ].filter(Boolean);

  return (
    <>
      <FilmGrain />

      {/* ── Intro Header ─────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "68px",
          minHeight: "40vh",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "calc(68px + 3rem) clamp(1.25rem, 5vw, 4rem) 3rem",
        }}
      >
        <nav
          aria-label="Breadcrumb"
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.75rem", flexWrap: "wrap" }}
        >
          <Link href="/" className="label" style={{ textDecoration: "none", color: "var(--muted)" }}>Home</Link>
          <span className="label" style={{ color: "var(--muted)" }}>—</span>
          <Link href="/products" className="label" style={{ textDecoration: "none", color: "var(--muted)" }}>Shop</Link>
          <span className="label" style={{ color: "var(--muted)" }}>—</span>
          <Link href={`/categories/${product.categorySlug}`} className="label" style={{ textDecoration: "none", color: "var(--muted)" }}>
            {product.category}
          </Link>
          <span className="label" style={{ color: "var(--muted)" }}>—</span>
          <span className="label" style={{ color: "var(--brass)" }}>{product.name}</span>
        </nav>

        <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
          {product.category}
          {product.new ? "  ·  New Arrival" : ""}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            color: "var(--heading)",
            marginBottom: "0.85rem",
          }}
        >
          {product.name}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            color: "var(--body)",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          {product.tagline}
        </p>
      </section>

      {/* ── Scrollytelling visual showcase or main detail ─────────────────── */}
      {product.copyBeats.length > 0 ? (
        <ScrollHero product={product} />
      ) : (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem clamp(1.25rem, 4vw, 3rem) 4rem" }}>
          <PhotoGallery images={allImages} productName={product.name} />
        </section>
      )}

      {/* ── Product Specifications & Purchase Box ──────────────────────── */}
      <section
        id="buy"
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "5rem clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem 5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Specs */}
          <div>
            <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
              Garment Specifications
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--heading)",
                marginBottom: "2rem",
              }}
            >
              Every detail considered.
            </h2>

            <dl style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "1rem",
                    borderBottom: "1px dashed var(--border)",
                  }}
                >
                  <dt className="label" style={{ color: "var(--muted)", textTransform: "capitalize" }}>
                    {key}:
                  </dt>
                  <dd style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, color: "var(--heading)", textAlign: "right" }}>
                    {val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Price & Add to Cart */}
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              padding: "2.5rem",
              borderRadius: "4px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
              <span className="label-brass">In Stock · Handcrafted</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 600, color: "var(--heading)" }}>
                {product.price}
              </span>
            </div>

            <SizeSelector
              sizes={product.sizes}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={product.images.hero}
              ctaLabel={`Add ${product.name} to Cart`}
            />

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--muted)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div>✓ Complimentary Express Worldwide Shipping</div>
              <div>✓ 30-Day Easy Returns & Exchanges</div>
              <div>✓ Lifetime Guarantee on Stitching & Zippers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Gallery Grid ────────────────────────────────────────────── */}
      <section style={{ padding: "5rem clamp(1.25rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem", textAlign: "center" }}>
            Visual Detail
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            The Gallery
          </h2>

          <PhotoGallery images={allImages} productName={product.name} />
        </div>
      </section>

      {/* ── Related Products ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          style={{
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border)",
            padding: "5rem clamp(1.25rem, 5vw, 4rem) 6rem",
          }}
        >
          <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
              <div>
                <p className="label-brass" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Curated Pairs
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400 }}>
                  You Might Also Like
                </h2>
              </div>
              <Link href="/products" className="btn btn-outline">
                View All Shop
              </Link>
            </div>

            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
