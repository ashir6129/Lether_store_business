import { redirect } from "next/navigation";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function LegacyJacketRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/products/${slug}`);
}
