import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "primary-contrast" | "ink" | "outline" | "light" | "lightOutline";
type Size = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  /** Label shown inside the custom cursor while hovering this button. */
  cursorLabel?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  "primary-contrast": "bg-white text-primary hover:opacity-90",
  ink: "bg-ink text-ink-fg hover:opacity-90",
  outline: "border-2 border-current text-fg hover:bg-fg/10",
  light: "bg-white text-primary hover:bg-white/90",
  lightOutline: "border-2 border-white text-white hover:bg-white/15",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  className,
  cursorLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-display font-bold uppercase",
    "transition-[translate,opacity] duration-200 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        data-cursor={cursorLabel}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} data-cursor={cursorLabel}>
      {children}
    </button>
  );
}
