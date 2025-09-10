"use client";

import { useEffect, useRef, useState } from 'react';

interface Soul {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  maxOpacity: number;
  fadeInRate: number;
  fadeOutRate: number;
  size: number;
  angle: number;
  rotationSpeed: number;
  trailLength: number;
  trailPositions: { x: number; y: number; opacity: number }[];
  lifePhase: 'appearing' | 'visible' | 'fading';
  visibleTimer: number;
  distortion: number;
  pulseSpeed: number;
}

interface SoulsBackgroundProps {
  enabled: boolean;
}

export default function SoulsBackground({ enabled }: SoulsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const soulsRef = useRef<Soul[]>([]);
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isSupported, setIsSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Performance: Check device capabilities
  useEffect(() => {
    const checkSupport = () => {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsSupported(false);
        return;
      }
      
      // Basic performance heuristics
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsSupported(false);
        return;
      }
      
      // Check if device might be low-end
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEnd = isMobile && window.devicePixelRatio < 2;
      
      if (isLowEnd) {
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  // Performance: Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Create souls anywhere on screen with varied properties
  const createSoul = (canvas: HTMLCanvasElement): Soul => {
    const spawnEdge = Math.random();
    let x, y;
    
    // Spawn from edges of screen for more natural movement
    if (spawnEdge < 0.25) {
      x = Math.random() * canvas.width;
      y = -50;
    } else if (spawnEdge < 0.5) {
      x = canvas.width + 50;
      y = Math.random() * canvas.height;
    } else if (spawnEdge < 0.75) {
      x = Math.random() * canvas.width;
      y = canvas.height + 50;
    } else {
      x = -50;
      y = Math.random() * canvas.height;
    }
    
    const fadeInRate = 0.008 + Math.random() * 0.012; // Varied fade in speed
    const fadeOutRate = 0.015 + Math.random() * 0.025; // Faster fade out
    
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      opacity: 0,
      maxOpacity: 0.2 + Math.random() * 0.6, // More variety in brightness
      fadeInRate,
      fadeOutRate,
      size: 1.5 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      trailLength: 8 + Math.random() * 12, // Variable trail lengths
      trailPositions: [],
      lifePhase: 'appearing',
      visibleTimer: 0,
      distortion: 0.3 + Math.random() * 0.7, // Distortion amount
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  };

  // Enhanced oil swirl effect covering whole background
  const drawOilBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Clear with base dark color
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create multiple swirling oil layers
    const layers = [
      { centerX: canvas.width * 0.3, centerY: canvas.height * 0.3, radius: Math.max(canvas.width, canvas.height) * 0.8, speed: 0.0003, direction: 1 },
      { centerX: canvas.width * 0.7, centerY: canvas.height * 0.7, radius: Math.max(canvas.width, canvas.height) * 0.9, speed: 0.0002, direction: -1 },
      { centerX: canvas.width * 0.5, centerY: canvas.height * 0.5, radius: Math.max(canvas.width, canvas.height) * 1.2, speed: 0.0001, direction: 1 },
    ];

    layers.forEach((layer, layerIndex) => {
      const gradient = ctx.createRadialGradient(
        layer.centerX, layer.centerY, 0,
        layer.centerX, layer.centerY, layer.radius
      );
      
      const rotation = time * layer.speed * layer.direction;
      const pulse = Math.sin(time * 0.0005 + layerIndex) * 0.05;
      
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(0.2 + pulse, '#0d0d0d');
      gradient.addColorStop(0.4 + pulse, '#131313');
      gradient.addColorStop(0.7 + pulse, '#0a0a0a');
      gradient.addColorStop(1, '#050505');

      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    });

    // Add subtle swirl lines
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
      const radius = (i + 1) * 100;
      const rotation = time * 0.0005 * (i % 2 === 0 ? 1 : -1);
      
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const x = centerX + Math.cos(angle + rotation) * radius * (1 + Math.sin(angle * 3 + time * 0.001) * 0.2);
        const y = centerY + Math.sin(angle + rotation) * radius * (1 + Math.cos(angle * 3 + time * 0.001) * 0.2);
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    ctx.restore();
  };

  // Enhanced soul drawing with trails and distortion
  const drawSouls = (ctx: CanvasRenderingContext2D, souls: Soul[], time: number) => {
    souls.forEach(soul => {
      if (soul.opacity <= 0) return;

      // Draw trail first (behind the soul)
      if (soul.trailPositions.length > 1) {
        ctx.save();
        
        for (let i = 1; i < soul.trailPositions.length; i++) {
          const trail = soul.trailPositions[i];
          const trailAlpha = trail.opacity * soul.opacity * 0.3;
          
          if (trailAlpha > 0.01) {
            ctx.globalAlpha = trailAlpha;
            
            // Trail glow
            const trailGradient = ctx.createRadialGradient(
              trail.x, trail.y, 0,
              trail.x, trail.y, soul.size * 2
            );
            trailGradient.addColorStop(0, '#e0e0e0');
            trailGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = trailGradient;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, soul.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        ctx.restore();
      }

      // Only show trail - no main soul circle
      
      ctx.restore();
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled || !isSupported || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += 16; // ~60fps
    
    // Draw oil background
    drawOilBackground(ctx, canvas, timeRef.current);
    
    // Update souls with enhanced behavior
    soulsRef.current.forEach(soul => {
      // Update trail positions
      soul.trailPositions.unshift({ x: soul.x, y: soul.y, opacity: 1.0 });
      if (soul.trailPositions.length > soul.trailLength) {
        soul.trailPositions.pop();
      }
      
      // Fade trail positions
      soul.trailPositions.forEach((trail, index) => {
        trail.opacity = Math.max(0, 1.0 - (index / soul.trailLength));
      });
      
      // Add organic movement with swirling
      soul.angle += soul.rotationSpeed;
      const swirl = Math.sin(timeRef.current * 0.0005 + soul.angle) * 0.3;
      
      soul.vx += Math.cos(soul.angle + swirl) * 0.02;
      soul.vy += Math.sin(soul.angle + swirl) * 0.02;
      
      // Add some random drift
      soul.vx += (Math.random() - 0.5) * 0.01;
      soul.vy += (Math.random() - 0.5) * 0.01;
      
      // Apply velocity with gentle dampening
      soul.x += soul.vx;
      soul.y += soul.vy;
      soul.vx *= 0.985;
      soul.vy *= 0.985;
      
      // Handle life phases with varied timing
      if (soul.lifePhase === 'appearing') {
        soul.opacity += soul.fadeInRate;
        if (soul.opacity >= soul.maxOpacity) {
          soul.lifePhase = 'visible';
          // Random visible duration
          soul.visibleTimer = 180 + Math.random() * 240; // 3-7 seconds at 60fps
        }
      } else if (soul.lifePhase === 'visible') {
        soul.visibleTimer--;
        if (soul.visibleTimer <= 0) {
          soul.lifePhase = 'fading';
        }
      } else if (soul.lifePhase === 'fading') {
        soul.opacity -= soul.fadeOutRate;
      }
      
      // Reset soul if completely faded with random respawn timing
      if (soul.opacity <= 0 && Math.random() < 0.005) {
        Object.assign(soul, createSoul(canvas));
      }
      
      // More generous bounds - souls can travel further off screen
      if (soul.x < -200) soul.x = canvas.width + 200;
      if (soul.x > canvas.width + 200) soul.x = -200;
      if (soul.y < -200) soul.y = canvas.height + 200;
      if (soul.y > canvas.height + 200) soul.y = -200;
    });
    
    // Draw souls with time parameter for animations
    drawSouls(ctx, soulsRef.current, timeRef.current);
    
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Handle resize with throttling for performance
  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateDimensions();
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };
    
    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize souls (increased by 20% for better coverage)
    const soulCount = dimensions.width < 768 ? 10 : 18; // 8->10 (+25%), 15->18 (+20%)
    soulsRef.current = Array.from({ length: soulCount }, () => createSoul(canvas));
    
    if (enabled && isSupported) {
      animate();
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [dimensions, enabled, isSupported, isVisible]);

  // Don't render if not enabled or not supported
  if (!enabled || !isSupported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{ 
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}