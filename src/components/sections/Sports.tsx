"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sports, sportsCopy } from "@/data/sports";

const copy = sportsCopy[0];

export function Sports() {
  const scrollRegionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    const region = scrollRegionRef.current;
    if (!region) return;
    const cards = region.querySelectorAll<HTMLElement>("[data-sport-card]");
    const card = cards[index];
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(region).columnGap) || 16;
    region.scrollTo({
      left: index * (card.getBoundingClientRect().width + gap),
      behavior: shouldReduceMotion === true ? "instant" : "smooth",
    });
    setActiveIndex(index);
  };

  const syncActiveIndex = () => {
    const region = scrollRegionRef.current;
    const firstCard = region?.querySelector<HTMLElement>("[data-sport-card]");
    if (!region || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(region).columnGap) || 16;
    setActiveIndex(Math.max(0, Math.min(sports.length - 1, Math.round(region.scrollLeft / (firstCard.offsetWidth + gap)))));
  };

  return (
    <section aria-labelledby="sports-title" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading id="sports-title" align="left">
            {copy.heading.map((part, index) =>
              part.accent ? <em key={index}>{part.text}</em> : <span key={index}>{part.text}</span>,
            )}
          </SectionHeading>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={copy.previousLabel}
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg hover:bg-surface"
            >
              <ChevronLeft aria-hidden size={20} />
            </button>
            <button
              type="button"
              aria-label={copy.nextLabel}
              onClick={() => scrollToCard(Math.min(sports.length - 1, activeIndex + 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg hover:bg-surface"
            >
              <ChevronRight aria-hidden size={20} />
            </button>
          </div>
        </div>
        <p className="mt-7 max-w-3xl text-xl leading-relaxed text-accent-text">
          {copy.statement.map((part, index) =>
            part.accent ? <em key={index}>{part.text}</em> : <span key={index}>{part.text}</span>,
          )}
        </p>
        <p className="mt-2 text-base text-muted">{copy.description}</p>
        <div
          ref={scrollRegionRef}
          role="region"
          aria-label={copy.regionLabel}
          tabIndex={0}
          onScroll={syncActiveIndex}
          className="mt-9 overflow-x-auto motion-safe:scroll-smooth snap-x snap-mandatory focus-visible:rounded-2xl"
        >
          <RevealGroup as="ul" className="flex w-max gap-4 pb-4">
            {sports.map((sport) => (
              <RevealItem as="li" key={sport.name} className="w-[17rem] snap-start">
                <article data-sport-card className="group overflow-hidden rounded-sm bg-surface">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {sport.image ? (
                      <Image
                        src={sport.image}
                        alt={sport.name}
                        fill
                        sizes="17rem"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-ink px-5 text-center text-white">
                        <span className="font-display text-4xl font-bold uppercase">{sport.name}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="px-4 py-3 font-display text-xl font-bold uppercase">{sport.name}</h3>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <div role="group" aria-label={copy.regionLabel} className="mt-2 flex flex-wrap justify-center gap-1">
          {sports.map((sport, index) => (
            <button
              key={sport.name}
              type="button"
              aria-label={`${copy.goToLabel} ${sport.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToCard(index)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? "bg-primary" : "bg-line"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}