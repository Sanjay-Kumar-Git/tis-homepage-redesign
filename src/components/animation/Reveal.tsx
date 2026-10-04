"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Reveals once, slightly before the element is fully in view.
const viewport = { once: true, margin: "-80px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/** Parent that staggers its RevealItem children as it scrolls into view. */
export function RevealGroup({ children, className, as = "div" }: RevealProps & { as?: "div" | "ul" }) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag className={className} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Tag>
  );
}

/** Child of RevealGroup. Inherits the hidden/show state from the parent. */
export function RevealItem({ children, className, as = "div" }: RevealProps & { as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
