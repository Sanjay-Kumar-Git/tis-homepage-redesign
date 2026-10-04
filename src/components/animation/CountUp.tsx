"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  suffix: string;
}

export function CountUp({ value, suffix }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const numberElement = numberRef.current;
    if (!numberElement || !isInView || shouldReduceMotion !== false) return;

    const controls = animate(0, value, {
      duration: 1.2,
      onUpdate: (latest) => {
        numberElement.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <>
      <span ref={numberRef} aria-label={`${value}${suffix}`}>
        {value}
      </span>
      {suffix}
    </>
  );
}