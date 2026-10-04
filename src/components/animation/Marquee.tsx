import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeStyle = CSSProperties & { "--marquee-duration": string };

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Marquee({ children, duration = 36, className }: MarqueeProps) {
  const style: MarqueeStyle = { "--marquee-duration": `${duration}s` };

  return (
    <div className={cn("marquee", className)}>
      <div className="marquee-track" style={style}>
        <div className="marquee-copy">{children}</div>
        <div className="marquee-copy" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}