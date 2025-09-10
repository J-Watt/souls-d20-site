"use client";
import { motion } from "framer-motion";

type Props = {
  x: number;
  y: number;
  title: string;
  body: string;
  imgSrc?: string;
  onClose: () => void;
};

export default function MapPopover({ x, y, title, body, imgSrc, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute z-[500] pointer-events-auto"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -110%)",
      }}
    >
      {/* Fixed-size card so the image can be a stable 40% of the height */}
      <div className="bg-theme-surface/95 border border-white/10 rounded-2xl shadow-soft w-72 sm:w-80 h-64 overflow-hidden">
        {/* Image: fixed to ~40% of the popover height */}
        <div className="h-[40%] w-full bg-black/30">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs opacity-60">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="h-[60%] px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold leading-tight">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-md px-2 py-1 text-[11px] bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-[8]">
            {body}
          </p>
        </div>
      </div>

      {/* Little arrow */}
      <div
        className="w-3 h-3 rotate-45 bg-theme-surface/95 border-l border-t border-white/10 mx-auto"
        style={{ marginTop: "-6px" }}
      />
    </motion.div>
  );
}
