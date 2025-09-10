"use client";
import { motion } from "framer-motion";

export default function LandmarkPanel({ title, body, onClose }:{ title:string; body:string; onClose:()=>void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 bg-theme-surface/95 border border-white/10 rounded-2xl p-4 max-w-sm shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-80 mt-1">{body}</p>
        </div>
        <button onClick={onClose} className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20">Close</button>
      </div>
    </motion.div>
  );
}
