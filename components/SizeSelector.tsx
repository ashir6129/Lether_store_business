"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SizeGuideModal from "@/components/SizeGuideModal";

interface Props {
  sizes?: string[];
  slug: string;
  name: string;
  price: string;
  image: string;
  ctaLabel: string;
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

export default function SizeSelector({ sizes, slug, name, price, image, ctaLabel }: Props) {
  const { addItem, openCart } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  // Custom measurements state
  const [chest, setChest] = useState("");
  const [length, setLength] = useState("");
  const [armLength, setArmLength] = useState("");
  const [notes, setNotes] = useState("");

  const availableSizes = sizes && sizes.length > 0 ? sizes : ALL_SIZES;

  function handleAddToCart() {
    if (!selected && !isCustom) {
      setError(true);
      setTimeout(() => setError(false), 2200);
      return;
    }

    if (isCustom && (!chest.trim() || !length.trim() || !armLength.trim())) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }

    const itemSize = isCustom ? "Custom Fit (Made-to-Measure)" : selected!;
    const customMeasurements = isCustom
      ? {
          chest: chest.trim(),
          length: length.trim(),
          armLength: armLength.trim(),
          notes: notes.trim(),
        }
      : undefined;

    addItem({
      slug,
      name,
      price,
      image,
      size: itemSize,
      customMeasurements,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      {/* Size label & Size Guide button */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: (selected || isCustom) ? "var(--heading)" : error ? "#c0392b" : "var(--body)",
            transition: "color 0.2s",
          }}
        >
          {error
            ? isCustom
              ? "Please enter chest, length & arm measurements"
              : "Please select a size or custom fit"
            : isCustom
            ? "Size: Custom Made-to-Measure"
            : selected
            ? `Size: ${selected}`
            : "Select a size"}
        </span>

        {/* Size Guide Button (opens size chart modal) */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--brass)",
            letterSpacing: "0.06em",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            padding: "0.2rem 0",
          }}
        >
          Size guide
        </button>
      </div>

      {/* Size buttons grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
          gap: "0.5rem",
          marginBottom: "1rem",
          padding: error && !isCustom ? "0.4rem" : "0",
          border: error && !isCustom ? "1.5px solid #c0392b" : "1.5px solid transparent",
          transition: "all 0.2s",
        }}
      >
        {availableSizes.map((size) => {
          const active = !isCustom && selected === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => {
                setSelected(size);
                setIsCustom(false);
                setError(false);
              }}
              aria-pressed={active}
              style={{
                height: "48px",
                background: active ? "var(--heading)" : "transparent",
                color: active ? "var(--bg)" : "var(--heading)",
                border: `1.5px solid ${active ? "var(--heading)" : "var(--border-strong)"}`,
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: active ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.18s ease",
                borderRadius: "2px",
              }}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Made-to-Measure Custom Size Button */}
      <button
        type="button"
        onClick={() => {
          setIsCustom(!isCustom);
          setSelected(null);
          setError(false);
        }}
        style={{
          width: "100%",
          padding: "0.65rem",
          marginBottom: "1.5rem",
          background: isCustom ? "rgba(200, 160, 100, 0.12)" : "transparent",
          border: `1.5px dashed ${isCustom ? "var(--brass)" : "var(--border-strong)"}`,
          color: isCustom ? "var(--heading)" : "var(--body)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "all 0.2s",
        }}
      >
        <span>✂️</span>
        <span>{isCustom ? "✓ Custom Fit Selected" : "+ Need Custom Size / Made-to-Measure?"}</span>
      </button>

      {/* Custom Size Form Fields (unfolds when isCustom is true) */}
      {isCustom && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--brass)",
            borderRadius: "4px",
            padding: "1.25rem",
            marginBottom: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="label-brass" style={{ fontSize: "0.7rem" }}>
              Tailored Made-to-Measure Specs
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>Inches (in) or cm</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="label" style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.65rem" }}>
                Chest *
              </label>
              <input
                type="text"
                placeholder='e.g. 44"'
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.45rem",
                  fontSize: "0.8rem",
                  color: "var(--heading)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="label" style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.65rem" }}>
                Jacket Length *
              </label>
              <input
                type="text"
                placeholder='e.g. 29"'
                value={length}
                onChange={(e) => setLength(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.45rem",
                  fontSize: "0.8rem",
                  color: "var(--heading)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="label" style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.65rem" }}>
                Arm Length *
              </label>
              <input
                type="text"
                placeholder='e.g. 25.5"'
                value={armLength}
                onChange={(e) => setArmLength(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.45rem",
                  fontSize: "0.8rem",
                  color: "var(--heading)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label className="label" style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.65rem" }}>
              Order Instructions & Custom Fit Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Broader shoulders, longer torso, preferred sleeve room, or custom lining notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.5rem",
                fontSize: "0.8rem",
                color: "var(--heading)",
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
            />
          </div>
        </div>
      )}

      {/* Add to Cart CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn"
          style={{
            background: added ? "var(--brass)" : "var(--heading)",
            color: "var(--bg)",
            padding: "1.1rem",
            width: "100%",
            justifyContent: "center",
            fontSize: "0.75rem",
            letterSpacing: "0.16em",
            transition: "background 0.3s ease, transform 0.15s ease",
            transform: added ? "scale(0.98)" : "scale(1)",
          }}
        >
          {added
            ? "✓ Added to cart"
            : error
            ? isCustom
              ? "Fill in custom measurements"
              : "Select a size first"
            : ctaLabel}
        </button>

        <button
          type="button"
          onClick={openCart}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center", padding: "0.9rem" }}
        >
          View cart
        </button>

        <Link
          href="/products"
          className="btn btn-ghost"
          style={{ width: "100%", justifyContent: "center", marginTop: "0.25rem" }}
        >
          ← Continue shopping
        </Link>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
