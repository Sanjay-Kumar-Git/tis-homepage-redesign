"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

const INTERACTIVE = "a, button, [role='button'], [data-cursor]";
// Mouse-like pointers only, and not for people who asked for less motion.
const ENABLE_QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
const SPRING = { stiffness: 500, damping: 40, mass: 0.4 };

/**
 * Ring that follows the mouse. Position lives in motion values, so mouse
 * movement never re-renders React. State changes only when the hovered target does.
 */
export function CustomCursor() {
  const enabled = useMediaQuery(ENABLE_QUERY);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);
  const smoothY = useSpring(y, SPRING);
  const [target, setTarget] = useState<{ active: boolean; label: string | null }>({
    active: false,
    label: null,
  });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(INTERACTIVE) : null;
      const label = el?.dataset.cursor ?? null;
      setTarget((prev) =>
        prev.active === Boolean(el) && prev.label === label ? prev : { active: Boolean(el), label },
      );
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y, opacity]);

  if (!enabled) return null;

  const { active, label } = target;

  return (
    <motion.div
      aria-hidden
      style={{ x: smoothX, y: smoothY, opacity }}
      className={cn("pointer-events-none fixed left-0 top-0 z-[100]", !label && "mix-blend-difference")}
    >
      <motion.div
        animate={{ scale: label ? 2.2 : active ? 1.5 : 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute -left-5 -top-5 h-10 w-10 rounded-full border-2",
          label ? "border-transparent bg-primary" : "border-white",
        )}
      />
      {label && (
        <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-sm font-bold uppercase text-white">
          {label}
        </span>
      )}
    </motion.div>
  );
}
