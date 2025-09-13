"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselSlide = {
  text: string;
  image: string;
  alt: string;
};

type Props = {
  slides: CarouselSlide[];
  autoRotateMs?: number;
  className?: string;
};

export default function InfoCarousel({ slides, autoRotateMs = 15000, className = "" }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoRotateMs);

    return () => clearInterval(interval);
  }, [slides.length, autoRotateMs]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrevious();
      }
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (slides.length === 0) return null;

  return (
    <div
      ref={carouselRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Panel */}
        <div className="panel">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: slides[currentIndex].text }}
          />
        </div>

        {/* Image */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Navigation arrows - hidden on mobile */}
      {slides.length > 1 && !isMobile && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute -left-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots navigation - show on all devices */}
      {slides.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-[color:var(--gold)]" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile swipe hint - show only on first load */}
      {isMobile && slides.length > 1 && (
        <div className="mt-4 text-center">
          <p className="text-sm opacity-60">Swipe left or right to navigate</p>
        </div>
      )}
    </div>
  );
}
