"use client";

import { useState } from "react";
import FilmGrain from "@/components/FilmGrain";

const FAQS = [
  {
    q: "What makes full-grain leather different from genuine or top-grain leather?",
    a: "Full-grain leather uses the topmost layer of the hide without sanding or buffing away natural grain. It retains maximum fiber strength, natural moisture resistance, and develops an irreplaceable patina with age.",
  },
  {
    q: "How do I choose the correct sizing for jackets & footwear?",
    a: "Our jackets are cut tailored through the chest and waist to accommodate light layering. If you plan to wear thick winter knits underneath or prefer a relaxed cut, we recommend sizing up one size. View exact measurements on each product page.",
  },
  {
    q: "What is your lifetime guarantee policy?",
    a: "We guarantee all structural stitching, snaps, and YKK zippers for the natural life of the product. If a zipper fails or a seam unravels under normal use, contact us for free repair service.",
  },
  {
    q: "What are your global shipping and return policies?",
    a: "We offer complimentary express shipping worldwide via DHL Express (3-5 business days). Unworn items in original condition can be returned or exchanged within 30 days of receipt.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    topic: "Sizing & Fit Advice",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FilmGrain />
      <div style={{ paddingTop: "68px", minHeight: "100vh" }}>
        {/* Header */}
        <section
          style={{
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
            padding: "4.5rem clamp(1.25rem, 5vw, 4rem) 4rem",
            textAlign: "center",
          }}
        >
          <p className="label-brass" style={{ display: "block", marginBottom: "0.75rem" }}>
            Atelier Concierge
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
            Customer Care & Inquiry
          </h1>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--body)",
              lineHeight: 1.6,
            }}
          >
            Have a question about sizing, custom orders, or leather maintenance? Our studio specialists respond within 24 hours.
          </p>
        </section>

        {/* Content Section */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem clamp(1.25rem, 4vw, 3rem) 6rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem 5rem",
            }}
          >
            {/* Left: Contact Form */}
            <div>
              <p className="label-brass" style={{ marginBottom: "0.75rem" }}>
                Direct Inquiry
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1.5rem" }}>
                Send a Message
              </h2>

              {submitted ? (
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--brass)", padding: "2.5rem", textAlign: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--heading)", marginBottom: "0.5rem" }}>
                    Message Received
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--body)" }}>
                    Thank you. A VERGE concierge specialist will reply to your email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Julian Thorne"
                      style={{
                        width: "100%",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        padding: "0.65rem 0.85rem",
                        color: "var(--heading)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      style={{
                        width: "100%",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        padding: "0.65rem 0.85rem",
                        color: "var(--heading)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      style={{
                        width: "100%",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        padding: "0.65rem 0.85rem",
                        color: "var(--heading)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    >
                      <option>Sizing & Fit Advice</option>
                      <option>Order Status & Shipping</option>
                      <option>Custom Leather Requests</option>
                      <option>Warranty & Lifetime Repair</option>
                      <option>Press & Wholesale</option>
                    </select>
                  </div>

                  <div>
                    <label className="label" style={{ display: "block", marginBottom: "0.35rem" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you?"
                      style={{
                        width: "100%",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        padding: "0.65rem 0.85rem",
                        color: "var(--heading)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <button type="submit" disabled={isLoading} className="btn btn-dark" style={{ padding: "0.8rem", width: "100%", opacity: isLoading ? 0.7 : 1 }}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Studio Details & FAQ */}
            <div>
              <p className="label-brass" style={{ marginBottom: "0.75rem" }}>
                Studio Locations
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1.5rem" }}>
                Ateliers & Hours
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "1.25rem" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.35rem" }}>
                    Porto Showroom
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.5 }}>
                    Rua das Flores 142<br />4000-246 Porto, Portugal<br />
                    Mon – Fri: 10:00 – 19:00
                  </p>
                </div>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "1.25rem" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.35rem" }}>
                    London Flagship
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.5 }}>
                    42 Redchurch Street<br />London E2 7DP, UK<br />
                    Mon – Sat: 11:00 – 19:00
                  </p>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div id="faq">
                <p className="label-brass" style={{ marginBottom: "0.75rem" }}>
                  Frequently Asked Questions
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {FAQS.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        style={{
                          width: "100%",
                          padding: "1rem 1.25rem",
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "var(--heading)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>{openFaq === idx ? "−" : "+"}</span>
                      </button>
                      {openFaq === idx && (
                        <div style={{ padding: "0 1.25rem 1.25rem", fontSize: "0.85rem", color: "var(--body)", lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
