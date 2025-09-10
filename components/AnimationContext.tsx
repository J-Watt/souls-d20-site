"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationContextType {
  backgroundAnimationEnabled: boolean;
  toggleBackgroundAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [backgroundAnimationEnabled, setBackgroundAnimationEnabled] = useState(true);

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('backgroundAnimation');
    if (saved !== null) {
      setBackgroundAnimationEnabled(JSON.parse(saved));
    }
  }, []);

  const toggleBackgroundAnimation = () => {
    const newValue = !backgroundAnimationEnabled;
    setBackgroundAnimationEnabled(newValue);
    localStorage.setItem('backgroundAnimation', JSON.stringify(newValue));
  };

  return (
    <AnimationContext.Provider value={{
      backgroundAnimationEnabled,
      toggleBackgroundAnimation,
    }}>
      {children}
    </AnimationContext.Provider>
  );
}