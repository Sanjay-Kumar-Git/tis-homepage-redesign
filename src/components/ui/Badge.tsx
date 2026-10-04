import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-4 py-1.5 text-sm font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
