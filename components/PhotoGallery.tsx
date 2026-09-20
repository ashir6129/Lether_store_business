"use client";

import Image from "next/image";

interface Props {
  images:      string[];
  productName: string;
}

export default function PhotoGallery({ images, productName }: Props) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: "0.5rem",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              position: "relative",
              aspectRatio: "3/4",
              background: "var(--bg-card)",
              overflow: "hidden",
            }}
          >
            <Image
              src={src}
              alt={`${productName} — photo ${i + 1}`}
              fill
              sizes="220px"
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              className="gallery-img"
            />
          </div>
        ))}
      </div>

      <style>{`
        .gallery-item:hover .gallery-img {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
