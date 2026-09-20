import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, categoriesMeta } from "@/data/products";
import ShopCatalog from "@/components/ShopCatalog";
import FilmGrain from "@/components/FilmGrain";

export async function generateStaticParams() {
  const cats = getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoriesMeta[slug];
  if (!meta) return { title: "Category — VERGE Studio" };

  return {
    title: `${meta.name} — VERGE Studio`,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = categoriesMeta[slug];
  if (!meta) notFound();

  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Category Header */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "4.5rem clamp(1.25rem, 5vw, 4rem) 4rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            Curated Category
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
            {meta.name}
          </h1>
          <p
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--body)",
              lineHeight: 1.6,
            }}
          >
            {meta.description}
          </p>
        </section>

        {/* Shop Catalog pre-filtered in Suspense */}
        <Suspense fallback={<div style={{ padding: "5rem", textAlign: "center" }}>Loading Category...</div>}>
          <ShopCatalog initialCategory={slug} />
        </Suspense>
      </div>
    </>
  );
}
