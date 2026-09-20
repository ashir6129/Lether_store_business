"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EXACT_SIZE_TABLE = [
  { size: "SMALL", chest: "40", length: "27", arm: "23" },
  { size: "MEDIUM", chest: "42", length: "28", arm: "24" },
  { size: "LARGE", chest: "44", length: "29", arm: "25" },
  { size: "X LARGE", chest: "46", length: "30", arm: "26" },
  { size: "2X LARGE", chest: "48", length: "30.5", arm: "27" },
  { size: "3X LARGE", chest: "50", length: "30.5", arm: "28.5" },
  { size: "4X LARGE", chest: "52", length: "31", arm: "28.5" },
  { size: "5X LARGE", chest: "56", length: "31.5", arm: "29" },
  { size: "6X LARGE", chest: "60", length: "32", arm: "29.5" },
];

export default function SizeGuideModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"graphic" | "table">("graphic");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        background: "rgba(10, 8, 6, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff",
          color: "#000000",
          maxWidth: "880px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "2rem clamp(1rem, 3vw, 2.5rem)",
          borderRadius: "6px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          position: "relative",
          fontFamily: "Arial, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close size chart"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "#000000",
            color: "#ffffff",
            border: "none",
            fontSize: "1.2rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Title Header matching Picture 2 */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <span
            style={{
              background: "#000000",
              color: "#ffffff",
              fontSize: "1.6rem",
              fontWeight: 700,
              padding: "0.35rem 1.75rem",
              borderRadius: "4px",
              display: "inline-block",
              letterSpacing: "0.02em",
            }}
          >
            Size Chart
          </span>
        </div>

        {/* View Switcher */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
          <button
            onClick={() => setActiveTab("graphic")}
            style={{
              background: activeTab === "graphic" ? "#000" : "#f0f0f0",
              color: activeTab === "graphic" ? "#fff" : "#333",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "3px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Visual Chart & Diagram (Picture 2)
          </button>
          <button
            onClick={() => setActiveTab("table")}
            style={{
              background: activeTab === "table" ? "#000" : "#f0f0f0",
              color: activeTab === "table" ? "#fff" : "#333",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "3px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            High-Res Infographic
          </button>
        </div>

        {/* Picture 2 Exact Layout */}
        {activeTab === "graphic" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "center",
              background: "#fff",
              padding: "1.25rem",
              border: "1.5px solid #000",
              borderRadius: "4px",
            }}
          >
            {/* Left Column: How to Measure Diagram */}
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem", color: "#000" }}>
                How To Measure ?
              </h3>
              <div style={{ position: "relative", width: "100%", height: "260px" }}>
                <svg viewBox="0 0 300 280" fill="none" stroke="#000" strokeWidth="2" style={{ width: "100%", height: "100%" }}>
                  {/* Jacket outline */}
                  <path d="M 120 40 L 150 70 L 180 40 L 205 50 L 255 100 L 230 120 L 210 90 L 210 240 L 90 240 L 90 90 L 70 120 L 45 100 L 95 50 Z" strokeWidth="2.5" fill="#fcfcfc" />
                  {/* Front zip line */}
                  <line x1="150" y1="70" x2="150" y2="240" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Pockets */}
                  <line x1="100" y1="190" x2="115" y2="225" strokeWidth="2" />
                  <line x1="200" y1="190" x2="185" y2="225" strokeWidth="2" />

                  {/* CHEST Arrow */}
                  <line x1="92" y1="135" x2="208" y2="135" stroke="#000" strokeWidth="2.5" />
                  <polygon points="92,135 100,130 100,140" fill="#000" />
                  <polygon points="208,135 200,130 200,140" fill="#000" />
                  <rect x="115" y="122" width="70" height="24" fill="#ffffff" />
                  <text x="150" y="139" textAnchor="middle" fill="#000" fontSize="13" fontWeight="800">CHEST</text>

                  {/* LENGTH Arrow */}
                  <line x1="185" y1="75" x2="185" y2="235" stroke="#000" strokeWidth="2.5" />
                  <polygon points="185,75 180,83 190,83" fill="#000" />
                  <polygon points="185,235 180,227 190,227" fill="#000" />
                  <text x="175" y="160" textAnchor="middle" fill="#000" fontSize="12" fontWeight="800" transform="rotate(-90 175 160)">LENGTH</text>

                  {/* ARM LENGTH Arrow */}
                  <line x1="75" y1="105" x2="40" y2="250" stroke="#000" strokeWidth="2.5" />
                  <polygon points="75,105 73,115 82,112" fill="#000" />
                  <polygon points="40,250 42,240 33,243" fill="#000" />
                  <text x="42" y="170" textAnchor="middle" fill="#000" fontSize="11" fontWeight="800" transform="rotate(-76 42 170)">ARM LENGTH</text>
                </svg>
              </div>
            </div>

            {/* Right Column: Exact Table from Picture 2 */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid #000" }}>
                <thead>
                  <tr style={{ background: "#000000", color: "#ffffff", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    <th style={{ padding: "0.6rem 0.5rem", border: "1px solid #000", textAlign: "left" }}>JACKET</th>
                    <th style={{ padding: "0.6rem 0.5rem", border: "1px solid #000", textAlign: "center" }}>CHEST</th>
                    <th style={{ padding: "0.6rem 0.5rem", border: "1px solid #000", textAlign: "center" }}>LENGTH</th>
                    <th style={{ padding: "0.6rem 0.5rem", border: "1px solid #000", textAlign: "center" }}>ARM LENGTH</th>
                  </tr>
                </thead>
                <tbody>
                  {EXACT_SIZE_TABLE.map((row) => (
                    <tr key={row.size} style={{ borderBottom: "1px solid #000", fontSize: "0.82rem", fontWeight: 600 }}>
                      <td style={{ padding: "0.45rem 0.6rem", borderRight: "1px solid #000", fontWeight: 700 }}>{row.size}</td>
                      <td style={{ padding: "0.45rem 0.5rem", borderRight: "1px solid #000", textAlign: "center" }}>{row.chest}</td>
                      <td style={{ padding: "0.45rem 0.5rem", borderRight: "1px solid #000", textAlign: "center" }}>{row.length}</td>
                      <td style={{ padding: "0.45rem 0.5rem", textAlign: "center" }}>{row.arm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Image
              src="/images/size-chart-picture2.png"
              alt="Jacket Size Chart & How to Measure Guide"
              width={800}
              height={800}
              style={{ width: "100%", height: "auto", maxHeight: "70vh", objectFit: "contain", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
        )}

        {/* Footer Note */}
        <div style={{ marginTop: "1.75rem", paddingTop: "1rem", borderTop: "1px solid #eee", textAlign: "center", fontSize: "0.8rem", color: "#666" }}>
          All measurements are listed in inches. Need custom made-to-measure tailoring? Select "Custom Fit" when choosing your size.
        </div>
      </div>
    </div>,
    document.body
  );
}
