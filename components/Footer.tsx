"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--heading)",
        color: "#f4ede3",
        padding: "5rem clamp(1.25rem, 5vw, 4rem) 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3.5rem 2rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand info */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                display: "inline-block",
                marginBottom: "1.25rem",
              }}
            >
              VERGE
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "rgba(244,237,227,0.7)",
                marginBottom: "1.5rem",
                maxWidth: "320px",
              }}
            >
              Artisanal full-grain leather outerwear, accessories, and apparel crafted in Portugal and Italy. Built to break in, not break down.
            </p>
            <p className="label-brass" style={{ color: "var(--brass)", fontSize: "0.68rem" }}>
              © {new Date().getFullYear()} VERGE STUDIO INC.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
                marginBottom: "1.25rem",
              }}
            >
              Collection
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/products" className="footer-link">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/jackets" className="footer-link">
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="footer-link">
                  Artisan Accessories
                </Link>
              </li>
              <li>
                <Link href="/new" className="footer-link">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
                marginBottom: "1.25rem",
              }}
            >
              About & Service
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/about" className="footer-link">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link href="/cart" className="footer-link">
                  Your Cart & Checkout
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="footer-link">
                  Shipping & Lifetime Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
                marginBottom: "1.25rem",
              }}
            >
              The Dispatch
            </h4>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(244,237,227,0.7)",
                marginBottom: "1rem",
              }}
            >
              Receive early access to limited edition drops, leather care guides, and studio journal entries.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to The Dispatch.");
              }}
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <input
                type="email"
                required
                placeholder="Enter email..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "2px",
                  padding: "0.6rem 0.8rem",
                  color: "#fff",
                  fontSize: "0.82rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "var(--brass)",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "2px",
                }}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "rgba(244,237,227,0.5)",
          }}
        >
          <div>VERGE STUDIO INC. — Handcrafted Leather Outerwear & Goods</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Complimentary Global Shipping</span>
            <span>Lifetime Guarantee</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: rgba(244,237,227,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--brass);
        }
      `}</style>
    </footer>
  );
}
