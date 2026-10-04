"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export function useScrolledPast(threshold: number): boolean {
  const { scrollY } = useScroll();
  const [scrolledPast, setScrolledPast] = useState(false);
  const previousValue = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextValue = latest > threshold;
    if (nextValue !== previousValue.current) {
      previousValue.current = nextValue;
      setScrolledPast(nextValue);
    }
  });

  return scrolledPast;
}