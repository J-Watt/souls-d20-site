"use client";
import { useState } from "react";

const tabs = [
  { key: "rulebook", label: "Rulebook", content: "Core rules, character creation, and GM guidance." },
  { key: "combat", label: "Combat", content: "Turn order, actions, reactions, and damage types." },
  { key: "builds", label: "Builds", content: "Classes, feats, and talent trees to customize your hero." }
];

export default function QuickstartTabs() {
  const [active, setActive] = useState("rulebook");
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)} className={`px-3 py-1.5 rounded-xl text-sm border border-white/10 hover:bg-white/5 ${active===t.key ? "bg-theme-accent/20" : ""}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-black/30 p-4 rounded-xl min-h-[120px]">{tabs.find(t => t.key===active)?.content}</div>
    </div>
  );
}
