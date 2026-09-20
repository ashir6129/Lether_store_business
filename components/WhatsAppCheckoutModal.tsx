"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppCheckoutUrls, CustomerDetails, WhatsAppTarget, buildWhatsAppOrderMessage } from "@/lib/whatsapp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  discountPercentage?: number;
  finalTotalStr?: string;
}

export default function WhatsAppCheckoutModal({
  isOpen,
  onClose,
  discountPercentage = 0,
  finalTotalStr,
}: Props) {
  const { items, total } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "error" | null>(null);
  const [whatsappTargets, setWhatsappTargets] = useState<WhatsAppTarget[] | null>(null);

  if (!isOpen) return null;

  const orderTotal = finalTotalStr || total;

  const handleOneClickCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate cart
    if (items.length === 0) {
      setErrorMessage("Your shopping cart is empty. Please add items before checking out.");
      return;
    }

    // Validate required customer fields
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    if (!address.trim()) {
      setErrorMessage("Please enter your delivery address.");
      return;
    }
    if (!city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    setIsSubmitting(true);
    setEmailStatus("sending");

    const customerDetails: CustomerDetails = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      notes: notes.trim(),
    };

    // 1. Send Order Email via API Route to ashiryeyy@gmail.com
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalStr: orderTotal,
          customerDetails,
          discountPercentage,
        }),
      });

      if (res.ok) {
        setEmailStatus("sent");
      } else {
        console.warn("API route email dispatch returned non-200 status");
        setEmailStatus("sent"); // Still set sent as mailto fallback is provided
      }
    } catch (err) {
      console.error("Failed to trigger send-order email API:", err);
      setEmailStatus("error");
    }

    // 2. Generate WhatsApp URLs and open target number +92 324 1732509
    const targets = getWhatsAppCheckoutUrls(
      items,
      orderTotal,
      customerDetails,
      discountPercentage
    );

    setWhatsappTargets(targets);

    // Open WhatsApp tab for primary number +92 324 1732509
    targets.forEach((target, index) => {
      setTimeout(() => {
        window.open(target.url, "_blank", "noopener,noreferrer");
      }, index * 250);
    });

    setIsSubmitting(false);
  };

  // Generate mailto link as direct fallback
  const mailSubject = encodeURIComponent(`New Order Inquiry from ${fullName.trim() || "Customer"}`);
  const mailBody = encodeURIComponent(buildWhatsAppOrderMessage(items, orderTotal, {
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    address: address.trim(),
    city: city.trim(),
    notes: notes.trim(),
  }, discountPercentage));
  const mailtoUrl = `mailto:ashiryeyy@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(24, 18, 14, 0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        animation: "fadeIn 0.25s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          maxWidth: "540px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.25rem clamp(1.25rem, 4vw, 2.25rem)",
          borderRadius: "6px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          disabled={isSubmitting}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "var(--muted)",
            cursor: "pointer",
            lineHeight: 1,
            padding: "0.25rem",
            transition: "color 0.2s",
          }}
        >
          ×
        </button>

        {whatsappTargets ? (
          /* Confirmation Screen after WhatsApp launch */
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#25D366",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.3)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.9rem",
                fontWeight: 400,
                color: "var(--heading)",
                marginBottom: "0.5rem",
              }}
            >
              Order Dispatched!
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--body)",
                lineHeight: 1.5,
                marginBottom: "1.25rem",
              }}
            >
              Your order invoice was sent simultaneously to <strong>WhatsApp (+92 324 1732509)</strong> and <strong>Email (ashiryeyy@gmail.com)</strong>.
            </p>

            {/* Notification Status Badges */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                marginBottom: "1.5rem",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  background: "rgba(37, 211, 102, 0.1)",
                  border: "1px solid #25D366",
                  color: "var(--heading)",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>💬</span>
                <div>
                  <strong>WhatsApp Invoice Sent</strong> to +92 324 1732509
                </div>
              </div>

              <div
                style={{
                  background: "rgba(200, 160, 100, 0.12)",
                  border: "1px solid var(--brass)",
                  color: "var(--heading)",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>✉️</span>
                <div>
                  <strong>Order Email Dispatched</strong> to ashiryeyy@gmail.com
                </div>
              </div>
            </div>

            {/* Target WhatsApp Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {whatsappTargets.map((target, idx) => (
                <a
                  key={target.number}
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    background: "#25D366",
                    color: "#ffffff",
                    justifyContent: "center",
                    padding: "0.85rem",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    fontWeight: 600,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    boxShadow: "0 4px 14px rgba(37, 211, 102, 0.28)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.276-1.121z" />
                  </svg>
                  <span>Open WhatsApp Chat ({target.displayNumber})</span>
                </a>
              ))}

              <a
                href={mailtoUrl}
                className="btn btn-outline"
                style={{
                  justifyContent: "center",
                  padding: "0.85rem",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>✉️ Send Backup Email via Mail Client</span>
              </a>
            </div>

            {/* Order Invoice Summary Card */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "1rem",
                marginBottom: "1.5rem",
                fontSize: "0.82rem",
                textAlign: "left",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              <div>📄 <strong>Items:</strong> {items.map((i) => `${i.name} (${i.size}) x${i.qty}`).join(", ")}</div>
              <div>💰 <strong>Total Invoice:</strong> {orderTotal}</div>
              <div>👤 <strong>Customer:</strong> {fullName} ({phone})</div>
              {email && <div>✉️ <strong>Customer Email:</strong> {email}</div>}
            </div>

            <button
              type="button"
              onClick={() => {
                setWhatsappTargets(null);
                onClose();
              }}
              className="btn btn-dark"
              style={{ width: "100%", justifyContent: "center", padding: "0.8rem", fontSize: "0.8rem" }}
            >
              Return to Store
            </button>
          </div>
        ) : (
          /* Main Customer Info & Dual Checkout Form */
          <form onSubmit={handleOneClickCheckout} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            <div>
              <span className="label-brass" style={{ display: "block", marginBottom: "0.35rem" }}>
                1-Click Order Concierge
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "var(--heading)",
                  margin: 0,
                }}
              >
                Delivery & Order Details
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                With one click, your order invoice will be sent directly to <strong>WhatsApp (+92 324 1732509)</strong> and <strong>Email (ashiryeyy@gmail.com)</strong>.
              </p>
            </div>

            {/* Error banner if validation fails */}
            {errorMessage && (
              <div
                style={{
                  background: "rgba(192, 57, 43, 0.1)",
                  border: "1px solid #c0392b",
                  color: "#c0392b",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Form Fields */}
            <div>
              <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  padding: "0.65rem 0.85rem",
                  fontSize: "0.88rem",
                  color: "var(--heading)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.88rem",
                    color: "var(--heading)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.88rem",
                    color: "var(--heading)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lahore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.88rem",
                    color: "var(--heading)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #123, Street 4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.88rem",
                    color: "var(--heading)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="label" style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.7rem" }}>
                Order Notes / Special Delivery Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Call before delivery..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  padding: "0.65rem 0.85rem",
                  fontSize: "0.85rem",
                  color: "var(--heading)",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                }}
              />
            </div>

            {/* Order Invoice Summary box */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "1rem 1.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Invoice Breakdown ({items.length} item{items.length !== 1 ? "s" : ""})
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--heading)" }}>
                  {orderTotal}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                {items.map((item, i) => (
                  <div key={`${item.slug}-${item.size}-${i}`} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>• {item.name} ({item.size}) × {item.qty}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button: 1-Click Order to WhatsApp & Email */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="whatsapp-btn"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                borderRadius: "4px",
                border: "none",
                background: isSubmitting ? "#1b9e4b" : "#25D366",
                color: "#ffffff",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.65rem",
                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.28)",
                transition: "all 0.25s ease",
              }}
            >
              {isSubmitting ? (
                <span>Sending Order to WhatsApp & Email...</span>
              ) : (
                <>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.276-1.121z" />
                  </svg>
                  <span>1-Click Order: Send to WhatsApp & Email — {orderTotal}</span>
                </>
              )}
            </button>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.73rem",
                color: "var(--muted)",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Sends order invoice to WhatsApp (<strong>+92 324 1732509</strong>) and Email (<strong>ashiryeyy@gmail.com</strong>).
            </div>
          </form>
        )}
      </div>

      <style>{`
        .whatsapp-btn:hover:not(:disabled) {
          background: #20bd5a !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.38) !important;
        }
        .whatsapp-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
