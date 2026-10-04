"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { layoutCopy } from "@/data/layout";
import { contact } from "@/data/contact";
import { uiCopy } from "@/data/page-content";
import { Button } from "@/components/ui/Button";
import { MobileMenuLinks } from "@/components/layout/MobileMenuLinks";
import { MobileMenuTiles } from "@/components/layout/MobileMenuTiles";

const copy = layoutCopy[0];

const menuVariants = {
  closed: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.045, delayChildren: 0.06 } },
};

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const triggerButton = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("nav a[href]")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      ) ?? []).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeIndex = Array.from(focusable).indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && activeIndex <= 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeIndex === -1 || activeIndex === focusable.length - 1)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
  }, [isOpen]);

  const closeOnLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? copy.closeMenuLabel : copy.openMenuLabel}
        data-cursor="Menu"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 xl:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {isOpen ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeOnLinkClick}
            className="fixed inset-0 z-[90] flex min-h-dvh flex-col overflow-y-auto bg-primary px-5 pb-8 pt-5 text-white xl:hidden sm:px-8"
          >
            <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col">
              <div className="flex justify-end">
                <button type="button" aria-label={copy.closeMenuLabel} onClick={() => setIsOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70">
                  <X aria-hidden size={22} />
                </button>
              </div>
              <div className="grid flex-1 items-start gap-8 py-6 lg:grid-cols-2 lg:gap-12">
                <MobileMenuLinks />
                <MobileMenuTiles />
              </div>
              <div className="mx-auto flex w-full max-w-xl flex-wrap gap-3 pt-5">
                <Button href={contact.applyUrl} variant="light" size="lg" cursorLabel={copy.applyCursorLabel}>
                  {copy.applyLabel}
                </Button>
                <Button href="#enquire" variant="lightOutline" size="lg">
                  {uiCopy[0].enquire}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}