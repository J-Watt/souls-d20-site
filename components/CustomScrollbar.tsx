"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function CustomScrollbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / documentHeight;

      setScrollPosition(scrollPercent * 100);
      setIsVisible(documentHeight > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide scrollbar on mobile for map and book pages
  const shouldHideOnMobile = isMobile && (pathname === '/map' || pathname === '/book');

  if (!isVisible || shouldHideOnMobile) return null;

  return (
    <div className="fixed right-2 top-20 h-[calc(100vh-5rem)] w-12 pointer-events-none z-30">
      <div
        className="absolute w-10 h-24 transition-transform duration-75"
        style={{
          top: `${Math.min(scrollPosition, 100 - (96 / (window.innerHeight - 80) * 100))}%`,
          transform: 'translateY(0px)'
        }}
      >
        <Image
          src="/images/scroller.png"
          alt="Scroll indicator"
          width={40}
          height={96}
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
}
