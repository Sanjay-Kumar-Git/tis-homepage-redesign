import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  children: ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
  className?: string;
}

/** Section title. Wrap words in <em> to get the brand's italic serif emphasis. */
export function SectionHeading({ id, children, eyebrow, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-display text-sm font-semibold uppercase text-accent-text">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-4xl font-extrabold uppercase leading-none [&_em]:font-accent [&_em]:font-black [&_em]:normal-case [&_em]:text-primary-text"
      >
        {children}
      </h2>
    </div>
  );
}
