"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import FilmGrain from "@/components/FilmGrain";
import WhatsAppCheckoutModal from "@/components/WhatsAppCheckoutModal";

export default function CartPage() {
  const { items, updateQty, removeItem, total, count, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutModal, setCheckoutModal] = useState(false);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === "VERGE10") {
      setDiscount(0.1);
      alert("10% Discount applied!");
    } else {
      alert("Invalid promo code. Try VERGE10");
    }
  };

  const numericTotal = parseFloat(total.replace(/[^0-9.]/g, "")) || 0;
  const finalTotal = numericTotal * (1 - discount);

  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Header */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "4rem clamp(1.25rem, 5vw, 4rem) 3.5rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            Shopping Bag
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--heading)",
              marginBottom: "0.75rem",
            }}
          >
            Review Your Bag
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--body)" }}>
            {count === 0 ? "Your bag is currently empty." : `You have ${count} item${count > 1 ? "s" : ""} in your cart.`}
          </p>
        </section>

        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem clamp(1.25rem, 4vw, 3rem) 6rem" }}>
          {items.length === 0 ? (
            <div style={{ padding: "6rem 2rem", textAlign: "center", background: "var(--bg-card)", border: "1px dashed var(--border)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>
                Your cart is empty
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
                Explore our full-grain leather jackets, footwear, and artisan accessories.
              </p>
              <Link href="/products" className="btn btn-dark">
                Shop All Products
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "4rem 5rem",
                alignItems: "start",
              }}
            >
              {/* Left: Cart items list */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
                  <span className="label">Item Details</span>
                  <span className="label">Quantity & Price</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingTop: "2rem" }}>
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.size}`}
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        paddingBottom: "2rem",
                        borderBottom: "1px dashed var(--border)",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          width: "90px",
                          height: "120px",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          flexShrink: 0,
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 500, marginBottom: "0.25rem" }}>
                            <Link href={`/products/${item.slug}`} style={{ color: "var(--heading)", textDecoration: "none" }}>
                              {item.name}
                            </Link>
                          </h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.35rem" }}>Size: {item.size}</p>
                          {item.customMeasurements && (
                            <div
                              style={{
                                fontSize: "0.78rem",
                                background: "rgba(200, 160, 100, 0.12)",
                                border: "1px solid var(--brass)",
                                padding: "0.5rem 0.75rem",
                                borderRadius: "3px",
                                marginBottom: "0.75rem",
                                color: "var(--heading)",
                                lineHeight: 1.5,
                              }}
                            >
                              <div style={{ fontWeight: 600 }}>📐 Tailored Made-to-Measure:</div>
                              <div>Chest: <strong>{item.customMeasurements.chest}</strong> · Length: <strong>{item.customMeasurements.length}</strong> · Arm: <strong>{item.customMeasurements.armLength}</strong></div>
                              {item.customMeasurements.notes && (
                                <div style={{ fontStyle: "italic", marginTop: "0.25rem", color: "var(--body)" }}>
                                  Instruction Notes: "{item.customMeasurements.notes}"
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Qty & Remove */}
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "2px" }}>
                            <button
                              onClick={() => updateQty(item.slug, item.size, -1)}
                              style={{ padding: "0.25rem 0.6rem", background: "none", border: "none", cursor: "pointer", color: "var(--heading)" }}
                            >
                              −
                            </button>
                            <span style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.slug, item.size, 1)}
                              style={{ padding: "0.25rem 0.6rem", background: "none", border: "none", cursor: "pointer", color: "var(--heading)" }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#d9534f",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, textAlign: "right" }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Summary Box */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "2.5rem",
                  borderRadius: "4px",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                  Order Summary
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--muted)" }}>Subtotal:</span>
                    <span>{total}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--muted)" }}>Express Shipping:</span>
                    <span style={{ color: "var(--brass)", fontWeight: 600 }}>FREE</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--brass)" }}>
                      <span>Promo Discount (10%):</span>
                      <span>-£{(numericTotal * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <span>Total:</span>
                    <span>£{finalTotal.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Promo form */}
                <form onSubmit={applyPromo} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. VERGE10)"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    style={{
                      flex: 1,
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      padding: "0.55rem 0.75rem",
                      fontSize: "0.8rem",
                      color: "var(--heading)",
                      outline: "none",
                    }}
                  />
                  <button type="submit" className="btn btn-outline" style={{ padding: "0.55rem 1rem", fontSize: "0.72rem" }}>
                    Apply
                  </button>
                </form>

                <button
                  onClick={() => setCheckoutModal(true)}
                  className="btn"
                  style={{
                    width: "100%",
                    padding: "0.95rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    background: "#25D366",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    boxShadow: "0 4px 14px rgba(37, 211, 102, 0.28)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.276-1.121z" />
                  </svg>
                  <span>Order on WhatsApp — £{finalTotal.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </button>

                <div style={{ marginTop: "1.25rem", fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
                  💬 Instant WhatsApp Order Concierge · Direct Confirmation
                </div>
              </div>
            </div>
          )}
        </section>

        {/* WhatsApp Checkout Modal */}
        <WhatsAppCheckoutModal
          isOpen={checkoutModal}
          onClose={() => setCheckoutModal(false)}
          discountPercentage={discount}
          finalTotalStr={`£${finalTotal.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        />
      </div>
    </>
  );
}
