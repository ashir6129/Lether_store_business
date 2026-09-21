"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/images/home-hero.jpg",
  "/images/chatgpt-hero.png", // Replace with the second image you provided
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <Image
            src={images[index]}
            alt={`Verge Studio Outerwear ${index + 1}`}
            fill
            priority={index === 0}
            unoptimized={true}
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays for fading into the background */}
      <div className="hero-fade-desktop" aria-hidden style={{ zIndex: 1, position: "absolute", inset: 0 }} />
      <div className="hero-fade-mobile" aria-hidden style={{ zIndex: 1, position: "absolute", inset: 0 }} />
    </div>
  );
}
