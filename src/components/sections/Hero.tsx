"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { CircleImage } from "@/components/ui/CircleImage";
import { Button } from "@/components/ui/Button";
import { homepageActions } from "@/data/home";
import { heroSets } from "@/data/images";
import { site } from "@/data/site";
import type { HeroPhoto as HeroPhotoData } from "@/data/images";

interface HeroPhotoProps {
  photo: HeroPhotoData;
  priority: boolean;
  className: string;
}

function HeroPhoto({ photo, priority, className }: HeroPhotoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={photo.src}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        <CircleImage src={photo.src} alt="" sizes="(max-width: 767px) 38vw, 16rem" blob={photo.blob} priority={priority} />
      </motion.div>
    </AnimatePresence>
  );
}

export function Hero() {
  const [activeSet, setActiveSet] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const headlineWords = site.headline.split(" ");
  const displayedSet = shouldReduceMotion === true ? heroSets[0] : heroSets[activeSet];

  useEffect(() => {
    if (shouldReduceMotion !== false) return;

    let interval: number | undefined;
    const stopInterval = () => {
      if (interval !== undefined) window.clearInterval(interval);
      interval = undefined;
    };
    const syncVisibility = () => {
      stopInterval();
      if (document.visibilityState === "visible") {
        interval = window.setInterval(() => {
          setActiveSet((current) => (current + 1) % heroSets.length);
        }, 4000);
      }
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-2.75rem)] items-center overflow-hidden bg-primary text-primary-fg"
    >
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-2 items-center gap-x-3 gap-y-8 px-5 pb-36 pt-20 text-center md:grid-cols-[minmax(8rem,1fr)_minmax(0,2.2fr)_minmax(8rem,1fr)] md:gap-x-7 md:px-8 md:py-24">
        <HeroPhoto
          photo={displayedSet.photos[0]}
          priority={activeSet === 0}
          className="col-start-1 row-start-2 w-[clamp(7rem,36vw,11rem)] justify-self-end md:col-start-1 md:row-start-1 md:w-full md:max-w-60"
        />
        <div className="col-span-2 row-start-1 md:col-span-1 md:col-start-2 md:row-start-1">
          <h1 id="hero-title" className="font-display text-6xl font-extrabold uppercase leading-[0.92]">
            {headlineWords[0]} {headlineWords[1]} <em className="font-accent font-black normal-case">{headlineWords[2]}</em>
            <br />
            {headlineWords[3]} <em className="font-accent font-black normal-case">{headlineWords[4]}</em>
          </h1>
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 280 22"
            className="mx-auto mt-1 w-48 text-gold sm:w-64"
          >
            <motion.path
              d="M5 15C58 3 98 19 145 10S224 4 275 11"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.svg>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed">{site.intro}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {homepageActions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant}
                size="lg"
                cursorLabel={action.cursorLabel}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <HeroPhoto
          photo={displayedSet.photos[1]}
          priority={activeSet === 0}
          className="col-start-2 row-start-2 w-[clamp(7rem,36vw,11rem)] justify-self-start md:col-start-3 md:row-start-1 md:w-full md:max-w-60"
        />
      </div>
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion !== false ? undefined : { y: [0, 6, 0] }}
        transition={shouldReduceMotion !== false ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}