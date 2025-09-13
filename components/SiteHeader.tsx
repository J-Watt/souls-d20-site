// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "./AnimationContext";

const allLinks = [
  { href: "/info", label: "INFO" },
  { href: "/play", label: "PLAY" },
  { href: "/support", label: "SUPPORT" },
  { href: "/contact", label: "CONTACT" },
  { href: "/book", label: "BOOK" },
  { href: "/map", label: "MAP" },
];

const mobileLinks = [
  { href: "/", label: "HOME" },
  ...allLinks,
];

const leftLinks = allLinks.slice(0, 3);
const rightLinks = allLinks.slice(3);

export default function SiteHeader() {
  const { backgroundAnimationEnabled, toggleBackgroundAnimation } = useAnimation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10 overflow-visible">
        <nav className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between relative">
          {/* Mobile hamburger menu button - far left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all duration-300"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all duration-300"
            />
          </button>

          {/* Desktop animation toggle button - far left */}
          <button
            onClick={toggleBackgroundAnimation}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors"
            aria-label={`${backgroundAnimationEnabled ? 'Disable' : 'Enable'} background animation`}
            title={`${backgroundAnimationEnabled ? 'Disable' : 'Enable'} background animation`}
          >
            <div className={`w-3 h-3 rounded-full transition-colors ${
              backgroundAnimationEnabled ? 'bg-[color:var(--gold)]' : 'bg-gray-500'
            }`} />
            <span className="hidden sm:inline">Animation</span>
          </button>

          {/* Desktop navigation - hidden on mobile */}
          <ul className="hidden lg:flex items-center gap-4 sm:gap-5 md:gap-6 text-base md:text-lg">
            {leftLinks.map((l) => (
              <li key={l.href}>
                <Link className="rounded px-2 py-1 hover:bg-white/10" href={l.href as any}>
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
                <Link className="rounded px-2 py-1 hover:bg-white/10" href={l.href as any}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile layout - centered text */}
          <div className="lg:hidden flex items-center flex-1 justify-center">
            <Link href="/" aria-label="SoulsD20 Home" className="inline-flex">
              <span className="text-2xl font-bold text-[color:var(--gold)] tracking-wider">SoulsD20</span>
            </Link>
          </div>

          {/* Mobile - right side spacer for balance */}
          <div className="lg:hidden w-8"></div>

          {/* Desktop - right side spacer for balance */}
          <div className="hidden lg:block w-[100px] sm:w-[120px]"></div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[9999] bg-[#131313] border-r border-white/10 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-lg font-medium text-[color:var(--gold)]">SoulsD20</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <ul className="space-y-6">
                    {mobileLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href as any}
                          className="block text-xl font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer with animation toggle */}
                <div className="p-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      toggleBackgroundAnimation();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors"
                    aria-label={`${backgroundAnimationEnabled ? 'Disable' : 'Enable'} background animation`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-colors ${
                      backgroundAnimationEnabled ? 'bg-[color:var(--gold)]' : 'bg-gray-500'
                    }`} />
                    <span>Background Animation</span>
                    <span className="ml-auto text-xs opacity-60">
                      {backgroundAnimationEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
