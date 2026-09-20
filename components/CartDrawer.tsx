"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import WhatsAppCheckoutModal from "@/components/WhatsAppCheckoutModal";

export default function CartDrawer() {
  const { items, open, count, total, removeItem, updateQty, clearCart, closeCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [closeCart]);

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 800,
          background: "rgba(24,18,14,0.45)",
          backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
        aria-hidden
      />

      {/* ── Drawer ───────────────────────────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 900,
          width: "min(440px, 100vw)",
          background: "var(--bg)",
          boxShadow: "-12px 0 48px rgba(24,18,14,0.14)",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.32, 0, 0.15, 1)",
          willChange: "transform",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 1.75rem",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--heading)",
              }}
            >
              Your Cart
            </h2>
            {count > 0 && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--brass)",
                  letterSpacing: "0.06em",
                }}
              >
                {count} item{count !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              color: "var(--body)",
              fontSize: "1.3rem",
              lineHeight: 1,
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 1.75rem" }}>
          {items.length === 0 ? (
            /* Empty state */
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                padding: "3rem 0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "1.5px solid var(--border-strong)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  color: "var(--muted)",
                }}
              >
                ∅
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "var(--body)",
                }}
              >
                Your cart is empty
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", textAlign: "center", maxWidth: "22ch" }}>
                Add a jacket to get started.
              </p>
              <button
                onClick={closeCart}
                className="btn btn-dark"
                style={{ marginTop: "0.5rem" }}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.size}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 1fr",
                    gap: "1.25rem",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid var(--border)",
                    alignItems: "start",
                  }}
                >
                  {/* Thumbnail */}
                  <Link href={`/products/${item.slug}`} onClick={closeCart} style={{ display: "block", textDecoration: "none" }}>
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "3/4",
                        background: "var(--bg-card)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="90px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          color: "var(--heading)",
                          marginBottom: "0.25rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </p>
                    </Link>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Size: {item.size}
                    </p>
                    {item.customMeasurements && (
                      <div
                        style={{
                          fontSize: "0.72rem",
                          background: "rgba(200, 160, 100, 0.12)",
                          border: "1px solid var(--brass)",
                          padding: "0.4rem 0.6rem",
                          borderRadius: "2px",
                          marginBottom: "0.75rem",
                          color: "var(--heading)",
                          lineHeight: 1.4,
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>📐 Tailored Measurements:</div>
                        <div>Chest: {item.customMeasurements.chest} · Length: {item.customMeasurements.length} · Arm: {item.customMeasurements.armLength}</div>
                        {item.customMeasurements.notes && (
                          <div style={{ fontStyle: "italic", marginTop: "0.2rem", color: "var(--body)" }}>
                            "{item.customMeasurements.notes}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Qty + Remove row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {/* Qty stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1.5px solid var(--border-strong)",
                          height: "36px",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.slug, item.size, -1)}
                          aria-label="Decrease quantity"
                          style={{
                            width: "36px",
                            height: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1rem",
                            color: "var(--heading)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            width: "30px",
                            textAlign: "center",
                            color: "var(--heading)",
                            borderLeft: "1.5px solid var(--border)",
                            borderRight: "1.5px solid var(--border)",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.slug, item.size, 1)}
                          aria-label="Increase quantity"
                          style={{
                            width: "36px",
                            height: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1rem",
                            color: "var(--heading)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s",
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: "var(--heading)",
                          }}
                        >
                          {item.price}
                        </span>
                        <button
                          onClick={() => removeItem(item.slug, item.size)}
                          aria-label={`Remove ${item.name}`}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--muted)",
                            fontSize: "0.85rem",
                            padding: "0.2rem",
                            transition: "color 0.2s",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer: total + checkout */}
        {items.length > 0 && (
          <div
            style={{
              flexShrink: 0,
              padding: "1.5rem 1.75rem 2rem",
              borderTop: "1px solid var(--border)",
              background: "var(--bg-alt)",
            }}
          >
            {/* Subtotal row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Subtotal
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 400, color: "var(--heading)" }}>
                {total}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
              Shipping and taxes calculated at checkout.
            </p>

            {/* WhatsApp Checkout button */}
            <button
              type="button"
              className="btn"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "#25D366",
                color: "#ffffff",
                border: "none",
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.25)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => setIsCheckoutOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.276-1.121z" />
              </svg>
              <span>Order on WhatsApp — {total}</span>
            </button>

            {/* Link to Cart Page */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn btn-outline"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.75rem",
                fontSize: "0.75rem",
                marginTop: "0.75rem",
              }}
            >
              Review Cart & Customer Info
            </Link>

            {/* Clear */}
            <button
              onClick={clearCart}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "block",
                margin: "0.85rem auto 0",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>

      {/* WhatsApp Checkout Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
