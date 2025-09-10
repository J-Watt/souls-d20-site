// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAnimation } from "./AnimationContext";

const leftLinks = [
  { href: "/info", label: "INFO" },
  { href: "/play", label: "PLAY" },
  { href: "/support", label: "SUPPORT" },
];

const rightLinks = [
  { href: "/contact", label: "CONTACT" },
  { href: "/book", label: "BOOK" },
  { href: "/map", label: "MAP" },
];

export default function SiteHeader() {
  const { backgroundAnimationEnabled, toggleBackgroundAnimation } = useAnimation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10 overflow-visible">
      <nav className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between relative">
        {/* Animation toggle button - far left */}
        <button
          onClick={toggleBackgroundAnimation}
          className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors"
          aria-label={`${backgroundAnimationEnabled ? 'Disable' : 'Enable'} background animation`}
          title={`${backgroundAnimationEnabled ? 'Disable' : 'Enable'} background animation`}
        >
          <div className={`w-3 h-3 rounded-full transition-colors ${
            backgroundAnimationEnabled ? 'bg-[color:var(--gold)]' : 'bg-gray-500'
          }`} />
          <span className="hidden sm:inline">Animation</span>
        </button>

        {/* Center navigation */}
        <ul className="flex items-center gap-4 sm:gap-5 md:gap-6 text-base md:text-lg">
          {leftLinks.map((l) => (
            <li key={l.href}>
              <Link className="rounded px-2 py-1 hover:bg-white/10" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}

          {/* Center logo - larger and sticking out */}
          <li className="mx-2 md:mx-4 relative">
            <Link href="/" aria-label="SoulsD20 Home" className="inline-flex relative z-50">
              <Image
                src="/images/logos/SoulsD20 LOGO Color.png"
                alt="SoulsD20"
                width={240}
                height={60}
                priority
                className="h-16 w-auto transform translate-y-2 drop-shadow-lg"
              />
            </Link>
          </li>

          {rightLinks.map((l) => (
            <li key={l.href}>
              <Link className="rounded px-2 py-1 hover:bg-white/10" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Empty div for balance (same width as toggle button) */}
        <div className="w-[100px] sm:w-[120px]"></div>
      </nav>
    </header>
  );
}
