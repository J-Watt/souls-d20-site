"use client";

import { useAnimation } from "./AnimationContext";
import SoulsBackground from "./SoulsBackground";

export default function SoulsBackgroundWrapper() {
  const { backgroundAnimationEnabled } = useAnimation();
  return <SoulsBackground enabled={backgroundAnimationEnabled} />;
}