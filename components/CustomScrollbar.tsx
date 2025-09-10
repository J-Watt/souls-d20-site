"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CustomScrollbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <div className="fixed right-2 top-0 h-screen w-12 pointer-events-none z-50">
      <div 
        className="absolute w-10 h-24 transition-transform duration-75"
        style={{ 
          top: `${Math.min(scrollPosition, 100 - (96 / window.innerHeight * 100))}%`,
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