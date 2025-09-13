"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  x: number;
  y: number;
  title: string;
  body: string;
  imgSrc?: string;
  onClose: () => void;
};

export default function MapPopover({ x, y, title, body, imgSrc, onClose }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (imgSrc && isMobile) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = imgSrc;
    }
  }, [imgSrc, isMobile]);

  // Keep mobile images small so they don't take over the whole map
  const getMobileImageDimensions = () => {
    if (!isMobile || !imageDimensions) return null;

    // Target about 200px width on mobile
    const targetWidth = 200;
    const aspectRatio = imageDimensions.height / imageDimensions.width;

    // Make sure it fits on screen with some margin
    const width = Math.min(targetWidth, window.innerWidth - 64);
    const height = width * aspectRatio;

    // Don't let the image get too tall
    const maxHeight = 150;
    if (height > maxHeight) {
      return { width: maxHeight / aspectRatio, height: maxHeight };
    }

    return { width, height };
  };

  // Position the popover properly on different screen sizes
  const getPositionStyle = () => {
    if (!isMobile) {
      return {
        left: x,
        top: y,
        transform: "translate(-50%, -110%)",
      };
    }

    // Center horizontally and put above the marker
    const imageSize = getMobileImageDimensions();
    const popoverWidth = imageSize?.width || 320;

    const mapContainer = document.querySelector('.leaflet-container');
    const mapWidth = mapContainer?.clientWidth || window.innerWidth;

    return {
      left: Math.max(16, Math.min(x - popoverWidth / 2, mapWidth - popoverWidth - 16)),
      top: Math.max(16, y - (imageSize?.height || 150) - 100),
      transform: "none",
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute z-[500] pointer-events-auto"
      style={getPositionStyle()}
    >
      {/* Main popover container */}
      <div className={`bg-theme-surface/95 border border-white/10 rounded-2xl shadow-soft overflow-hidden ${
        isMobile
          ? 'flex flex-col'
          : 'flex w-[30rem] h-[12.5rem]'
      }`} style={isMobile ? {
          width: getMobileImageDimensions()?.width || 200,
          maxHeight: '60vh'
        } : {}}>

        {/* Image section */}
        <div className={`bg-black/30 flex-shrink-0 ${
          isMobile
            ? ''
            : 'w-[12.5rem] h-[12.5rem]'
        }`} style={isMobile ? (getMobileImageDimensions() || {}) : {}}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className={`${isMobile ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs opacity-60">
              No image
            </div>
          )}
        </div>

        {/* Content section */}
        <div className={`flex flex-col ${isMobile ? 'flex-1 min-h-0' : 'flex-1 h-full'}`}>
          <div className="flex items-start justify-between gap-2 p-3 flex-shrink-0">
            <h3 className={`font-semibold leading-tight ${isMobile ? 'text-base' : 'text-lg'}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-md px-2 py-1 text-xs bg-white/10 hover:bg-white/20 flex-shrink-0"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-3 min-h-0">
            <p className={`opacity-80 leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {body}
            </p>
          </div>
        </div>
      </div>

      {/* Arrow - only show on desktop */}
      {!isMobile && (
        <div
          className="w-3 h-3 rotate-45 bg-theme-surface/95 border-l border-t border-white/10 mx-auto"
          style={{ marginTop: "-6px" }}
        />
      )}
    </motion.div>
  );
}
