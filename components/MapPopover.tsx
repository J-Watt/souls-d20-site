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
      {/* Compact popover with reasonable sizing */}
      <div className="bg-theme-surface/95 border border-white/10 rounded-2xl shadow-soft overflow-hidden flex w-[30rem] h-[12.5rem]">
        {/* Image: left side, scaled down from 1024x1024 */}
        <div className="w-[12.5rem] h-[12.5rem] flex-shrink-0 bg-black/30">
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

        {/* Content: right side, same height as image */}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex items-start justify-between gap-2 p-3 flex-shrink-0">
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-md px-2 py-1 text-xs bg-white/10 hover:bg-white/20 flex-shrink-0"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-3">
            <p className="text-sm opacity-80 leading-relaxed">
              {body}
            </p>
          </div>
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
