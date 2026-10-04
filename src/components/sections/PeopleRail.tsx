"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { uiCopy } from "@/data/page-content";
import type { Person } from "@/data/people";

interface PeopleRailProps {
  label: string;
  people: Person[];
}

export function PeopleRail({ label, people }: PeopleRailProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const region = regionRef.current;
    if (!region) return;
    const card = region.querySelector("[data-person-card]");
    const width = card?.getBoundingClientRect().width ?? 280;
    region.scrollBy({ left: direction * (width + 16), behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-bold uppercase">{label}</h3>
        <div className="flex gap-2">
          <button type="button" aria-label={`${uiCopy[0].previous} ${label}`} onClick={() => move(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg hover:bg-surface"><ChevronLeft aria-hidden size={20} /></button>
          <button type="button" aria-label={`${uiCopy[0].next} ${label}`} onClick={() => move(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg hover:bg-surface"><ChevronRight aria-hidden size={20} /></button>
        </div>
      </div>
      <div ref={regionRef} role="region" aria-label={label} tabIndex={0} className="overflow-x-auto motion-safe:scroll-smooth snap-x snap-mandatory focus-visible:rounded-sm">
        <RevealGroup as="ul" className="flex w-max gap-4 pb-4">
          {people.map((person) => (
            <RevealItem as="li" key={person.name} className="w-[min(78vw,18rem)] snap-start">
              <article data-person-card className="h-full overflow-hidden rounded-sm border border-line bg-bg">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image src={person.image} alt={person.alt} fill sizes="(max-width: 767px) 78vw, 18rem" className="object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-display text-xl font-bold uppercase">{person.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{person.role}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}