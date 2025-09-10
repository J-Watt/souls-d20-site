"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  className?: string;
  rotateIntervalMs?: number;
  stopOnFirstClick?: boolean;
  aspectRatio?: `${number}/${number}` | "16/9" | "4/3" | "1/1";
};

export default function SmallCarousel({
  images,
  className,
  rotateIntervalMs = 2500,
  stopOnFirstClick = true,
  aspectRatio = "4/3",
}: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const clickedOnce = useRef(false);

  useEffect(() => {
    if (!playing || images.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      rotateIntervalMs
    );
    return () => clearInterval(t);
  }, [playing, images.length, rotateIntervalMs]);

  const handleClick = () => {
    if (stopOnFirstClick && !clickedOnce.current) {
      clickedOnce.current = true;
      setPlaying(false);
    } else {
      setPlaying((p) => !p);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={["relative w-full overflow-hidden select-none cursor-pointer", className]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio }}
      aria-label="Combat showcase carousel"
      role="region"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 768px) 60vw, 100vw"
          className="object-contain w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          priority={i === 0}
        />
      ))}

      {/* Indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: i === index ? "var(--gold)" : "rgba(255,255,255,.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
