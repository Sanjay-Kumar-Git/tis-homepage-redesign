"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/animation/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { layoutCopy } from "@/data/layout";
import { contact } from "@/data/contact";
import { navItems } from "@/data/navigation";
import { logo } from "@/data/images";
import { SITE_URL } from "@/data/site";
import { useScrolledPast } from "@/hooks/useScrolledPast";

const copy = layoutCopy[0];

export function Navbar() {
  const scrolledPast = useScrolledPast(40);

  return (
    <header
      className={`sticky top-0 z-40 -mb-[4.5rem] text-white ${scrolledPast ? "shadow-lg" : ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-primary"
        animate={{ opacity: scrolledPast ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <div className="relative mx-auto flex h-[4.5rem] max-w-screen-2xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/" aria-label="Tulas International School" className="shrink-0 rounded-full">
          <Image src={logo} alt="Tulas International School" width={52} height={52} sizes="52px" priority className="rounded-full" />
        </Link>
        <nav aria-label={copy.primaryNavLabel} className="hidden xl:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {item.children?.length ? (
                  <details className="group">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 whitespace-nowrap font-display text-xs font-bold uppercase marker:hidden hover:opacity-80">
                      {item.label}
                      <ChevronDown aria-hidden size={12} />
                    </summary>
                    <ul className="absolute left-0 top-full z-50 hidden max-h-[70vh] min-w-64 overflow-y-auto rounded-sm border border-white/20 bg-primary p-2 shadow-xl group-hover:block group-focus-within:block group-open:block">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link href={new URL(child.href, SITE_URL).href} className="flex min-h-11 items-center px-3 py-2 font-display text-sm font-semibold uppercase hover:bg-white/10">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={new URL(item.href, SITE_URL).href} className="flex min-h-11 items-center whitespace-nowrap font-display text-xs font-bold uppercase hover:opacity-80">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            href={contact.applyUrl}
            variant="primary-contrast"
            size="md"
            cursorLabel={copy.applyCursorLabel}
          >
            {copy.applyLabel}
          </Button>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}