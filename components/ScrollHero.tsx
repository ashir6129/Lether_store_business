"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "framer-motion";
import type { Product } from "@/data/products";

/* ── Opacity crossfade per photo ─────────────────────────────────────────── */
function usePhotoOpacity(
  progress: MotionValue<number>,
  i: number,
  total: number
): MotionValue<number> {
  const band = 1 / total;
  const xFade = band * 0.3;
  const s = i * band;
  const e = (i + 1) * band;

  const inputRange =
    i === 0
      ? [0, e - xFade, e + xFade]
      : i === total - 1
      ? [s - xFade, s + xFade, 1]
      : [s - xFade, s + xFade, e - xFade, e + xFade];

  const outputRange =
    i === 0
      ? [1, 1, 0]
      : i === total - 1
      ? [0, 1, 1]
      : [0, 1, 1, 0];

  return useTransform(progress, inputRange, outputRange);
}

/* ── Ken Burns scale ─────────────────────────────────────────────────────── */
function useKenBurns(
  progress: MotionValue<number>,
  i: number,
  total: number
): MotionValue<number> {
  const band = 1 / total;
  return useTransform(progress, [i * band, (i + 1) * band], [1.0, 1.05]);
}

/* ── Single photo layer ──────────────────────────────────────────────────── */
function PhotoLayer({
  src, alt, index, total, progress,
}: {
  src: string; alt: string; index: number; total: number; progress: MotionValue<number>;
}) {
  const opacity = usePhotoOpacity(progress, index, total);
  const scale   = useKenBurns(progress, index, total);
  return (
    <motion.div style={{ opacity, position: "absolute", inset: 0, willChange: "opacity" }}>
      <motion.div style={{ scale, position: "relative", width: "100%", height: "100%", willChange: "transform" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 52vw"
          style={{ objectFit: "contain" }}
          priority={index === 0}
          quality={85}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Copy beat block ─────────────────────────────────────────────────────── */
function CopyBlock({
  headline, subcopy, ctaLabel, slug, align, progress, beatIndex, total,
}: {
  headline: string; subcopy: string; ctaLabel?: string; slug: string;
  align: "left" | "right" | "center"; progress: MotionValue<number>;
  beatIndex: number; total: number;
}) {
  const band = 1 / total;
  const mid  = (beatIndex + 0.5) * band;
  const fw   = band * 0.22;

  const opacity = useTransform(progress,
    [mid - fw - 0.04, mid - fw, mid + fw, mid + fw + 0.04],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [mid - fw - 0.04, mid - fw], [30, 0]);
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ opacity, y: ySpring, willChange: "opacity, transform" }}
    >
      <span className="label-brass" style={{ display: "block", marginBottom: "1rem" }}>
        {"0" + (beatIndex + 1)}
      </span>
      <span className="brass-rule" />
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "var(--heading)",
          marginBottom: "1.25rem",
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
          color: "var(--body)",
          lineHeight: 1.8,
          maxWidth: "38ch",
          marginBottom: ctaLabel ? "2.25rem" : 0,
        }}
      >
        {subcopy}
      </p>
      {ctaLabel && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "flex-start" }}>
          <Link href={`/products/${slug}`} className="btn btn-dark">
            {ctaLabel}
          </Link>
          <Link href={`/products/${slug}`} className="btn btn-ghost">
            View sizing &amp; details →
          </Link>
        </div>
      )}
    </motion.div>
  );
}

/* ── Beat progress dots ───────────────────────────────────────────────────── */
function BeatDots({
  total, progress,
}: {
  total: number; progress: MotionValue<number>;
}) {
  const activeIndex = useTransform(progress, (v) => Math.min(Math.floor(v * total), total - 1));
  return (
    <motion.div
      style={{
        position: "absolute",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      className="hide-mobile"
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          style={{
            display: "block",
            width: "5px",
            height: activeIndex.get() === i ? "20px" : "5px",
            background: activeIndex.get() === i ? "var(--brass)" : "var(--border-strong)",
            borderRadius: "3px",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ── Main ScrollHero ─────────────────────────────────────────────────────── */
export default function ScrollHero({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const photos = useMemo(() => {
    const { hero, angle2, detail1, detail2, side, extra } = product.images;
    const list = [hero, angle2, detail1, detail2, side, ...(extra?.slice(0, 2) ?? [])];
    list.push(hero); // CTA beat returns to hero
    return list;
  }, [product.images]);

  const beats = product.copyBeats;
  const total = beats.length;

  // Left-aligned beats (all except "right")
  const leftBeats  = beats.filter((b) => b.align !== "right");
  // Right-aligned beats
  const rightBeats = beats.filter((b) => b.align === "right");

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "360vh" }}
      aria-label={`${product.name} story`}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
          display: "grid",
          gridTemplateColumns: "45fr 55fr",
        }}
      >
        {/* ── LEFT: copy column ──────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "68px 0 0 clamp(1.5rem, 7vw, 6rem)",
            zIndex: 2,
          }}
          className="hide-mobile"
        >
          {beats.map((beat, i) =>
            beat.align !== "right" ? (
              <div
                key={i}
                style={{ position: "absolute", inset: "68px 0 0 clamp(1.5rem, 7vw, 6rem)", display: "flex", alignItems: "center" }}
              >
                <CopyBlock
                  headline={beat.headline}
                  subcopy={beat.subcopy}
                  ctaLabel={beat.ctaLabel}
                  slug={product.slug}
                  align={beat.align ?? "left"}
                  progress={scrollYProgress}
                  beatIndex={i}
                  total={total}
                />
              </div>
            ) : null
          )}

          {/* Right-beat overlay (floats over photo column edge) */}
          {beats.map((beat, i) =>
            beat.align === "right" ? (
              <div
                key={`r-${i}`}
                style={{
                  position: "absolute",
                  right: "-30%",
                  top: "68px",
                  bottom: 0,
                  width: "42%",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <CopyBlock
                  headline={beat.headline}
                  subcopy={beat.subcopy}
                  slug={product.slug}
                  align="right"
                  progress={scrollYProgress}
                  beatIndex={i}
                  total={total}
                />
              </div>
            ) : null
          )}
        </div>

        {/* ── RIGHT: photo stack ─────────────────────────────────────────── */}
        <div style={{ position: "relative", height: "100%" }}>
          {/* Letterbox */}
          <div className="lbx-top" />
          <div className="lbx-bottom" />

          {/* Vignette */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(244,237,227,0.5) 100%)",
            }}
          />

          {/* Photos */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {photos.map((src, i) => (
              <PhotoLayer
                key={`ph-${i}-${src}`}
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                index={i}
                total={photos.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Beat dots nav */}
          <BeatDots total={total} progress={scrollYProgress} />
        </div>

        {/* ── MOBILE: single-column ──────────────────────────────────────── */}
        <div
          className="show-mobile"
          style={{
            gridColumn: "1 / -1",
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Photo top 58% */}
          <div style={{ position: "relative", flex: "0 0 58%" }}>
            {photos.map((src, i) => (
              <PhotoLayer
                key={`mob-${i}`}
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                index={i}
                total={photos.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
          {/* Copy bottom 42% */}
          <div style={{ flex: "0 0 42%", position: "relative", padding: "1.5rem 1.5rem 2rem", overflow: "hidden" }}>
            {beats.map((beat, i) => (
              <div key={i} style={{ position: "absolute", inset: "1.5rem 1.5rem 2rem" }}>
                <CopyBlock
                  headline={beat.headline}
                  subcopy={beat.subcopy}
                  ctaLabel={beat.ctaLabel}
                  slug={product.slug}
                  align="left"
                  progress={scrollYProgress}
                  beatIndex={i}
                  total={total}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
