"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { googleReviews } from "@/data/reviews";
import { sectionCopy, uiCopy } from "@/data/page-content";

export function GoogleReviews() {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("[data-review-card]");
    rail.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="reviews-title" className="relative isolate overflow-hidden px-6 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/reviews/google-reviews-background.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading id={sectionCopy[6].id} align="left">{sectionCopy[6].heading}</SectionHeading>
          <div className="flex gap-2">
            <button type="button" aria-label={`${uiCopy[0].previous} Google Reviews`} onClick={() => scroll(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg"><ChevronLeft aria-hidden size={20} /></button>
            <button type="button" aria-label={`${uiCopy[0].next} Google Reviews`} onClick={() => scroll(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg"><ChevronRight aria-hidden size={20} /></button>
          </div>
        </div>
        <div ref={railRef} role="region" aria-label="Google Reviews" tabIndex={0} className="mt-8 overflow-x-auto motion-safe:scroll-smooth snap-x snap-mandatory">
          <RevealGroup as="ul" className="flex w-max gap-4 pb-4">
            {googleReviews.map((review) => (
              <RevealItem as="li" key={review.name} className="w-[min(82vw,22rem)] snap-start">
                <article data-review-card className="h-full rounded-sm border border-line bg-bg p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-surface">
                      <Image src={review.image} alt={review.alt} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase">{review.name}</h3>
                      <p className="text-xs text-muted">{review.relation}</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="mt-4 flex text-gold">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-fg">{review.quote}</blockquote>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}