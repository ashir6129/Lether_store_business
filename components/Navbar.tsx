"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Shop All",      href: "/products" },
  { label: "Jackets",       href: "/categories/jackets" },
  { label: "New Arrivals",  href: "/new" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count, openCart }       = useCart();
  const router                   = useRouter();

  const isBlend = !scrolled && !open && !searchOpen;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto",
          zIndex: 500,
          transition: "background 0.4s ease, box-shadow 0.4s ease, color 0.4s ease",
          background: !isBlend ? "rgba(244,237,227,0.94)" : "transparent",
          backdropFilter: !isBlend ? "blur(18px)" : "none",
          WebkitBackdropFilter: !isBlend ? "blur(18px)" : "none",
          boxShadow: !isBlend ? "0 1px 0 rgba(24,18,14,0.08)" : "none",
          mixBlendMode: isBlend ? "difference" : "normal",
          color: isBlend ? "#ffffff" : "var(--heading)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 clamp(1.25rem, 4vw, 3rem)",
            height: "68px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0,
            }}
          >
            Verge
          </Link>

          {/* Desktop nav — centered */}
          <nav
            className="hide-mobile"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "2.25rem",
            }}
          >
            {NAV.map((l) => (
              <Link key={l.label} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Catalog"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Cart button with badge */}
            <button
              onClick={openCart}
              aria-label={`Cart — ${count} item${count !== 1 ? "s" : ""}`}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem 0.5rem",
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              {/* Bag icon */}
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {/* Count badge */}
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    background: "var(--brass)",
                    color: "#fff",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    lineHeight: 1,
                    minWidth: "16px",
                    height: "16px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 3px",
                    animation: "badgePop 0.25s ease",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            {/* Shop CTA - desktop only */}
            <Link
              href="/products"
              className={`btn hide-mobile ${isBlend ? 'btn-blend' : 'btn-dark'}`}
              style={{ padding: "0.55rem 1.25rem", fontSize: "0.68rem" }}
            >
              Shop Collection
            </Link>

            {/* Hamburger — mobile */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="show-mobile"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "22px",
                    height: "1.5px",
                    background: "currentColor",
                    transition: "transform 0.25s, opacity 0.25s",
                    transform: open
                      ? i === 0
                        ? "rotate(45deg) translateY(6.5px)"
                        : i === 2
                        ? "rotate(-45deg) translateY(-6.5px)"
                        : "none"
                      : "none",
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Quick Search Bar Slide Down */}
        {searchOpen && (
          <div
            style={{
              background: "var(--bg-card)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem clamp(1.25rem, 4vw, 3rem)",
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "0.75rem" }}>
              <input
                type="text"
                placeholder="Search jackets, materials, or accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.6rem 1rem",
                  color: "var(--heading)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button type="submit" className="btn btn-dark" style={{ padding: "0.6rem 1.5rem" }}>
                Search
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSearchOpen(false)}
                style={{ padding: "0.6rem 1rem" }}
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              background: "rgba(244,237,227,0.97)",
              backdropFilter: "blur(18px)",
              borderTop: "1px solid var(--border)",
              padding: "2rem clamp(1.25rem, 4vw, 3rem) 2.5rem",
            }}
          >
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {NAV.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      textDecoration: "none",
                      color: "var(--heading)",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/products" className="btn btn-dark" onClick={() => setOpen(false)}>
                  Shop Collection
                </Link>
                <button
                  onClick={() => { setOpen(false); openCart(); }}
                  className="btn btn-outline"
                >
                  Cart {count > 0 && `(${count})`}
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <style>{`
        .nav-link {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: inherit;
          opacity: 1;
          padding-bottom: 2px;
          border-bottom: 1.5px solid transparent;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .nav-link:hover {
          opacity: 1;
          border-bottom-color: currentColor;
        }
        .btn-blend {
          border: 1.5px solid currentColor;
          background: transparent;
          color: inherit;
        }
        .btn-blend:hover {
          background: currentColor;
          color: #000;
        }
        @keyframes badgePop {
          0%   { transform: scale(0.5); }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
