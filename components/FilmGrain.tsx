"use client";
import { useEffect, useRef } from "react";

/**
 * FilmGrain — renders a procedural SVG feTurbulence noise pattern as a
 * fixed full-page overlay at very low opacity.
 * Cost: zero. No external assets, no subscriptions.
 */
export default function FilmGrain() {
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate seed on rAF for a genuine film-grain flicker
  useEffect(() => {
    let raf: number;
    const filter = svgRef.current?.querySelector("feTurbulence");
    let frame = 0;

    function tick() {
      frame++;
      // Only update every 3 frames (~20fps flicker) to stay cheap
      if (frame % 3 === 0 && filter) {
        filter.setAttribute("seed", String(Math.floor(Math.random() * 100)));
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="film-grain"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
