"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards } from "@/data/awards";
import { awardsCopy, sectionCopy } from "@/data/page-content";

export function AwardsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleAwards = showAll ? awards : awards.slice(0, 2);

  return (
    <section aria-labelledby="awards-title" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id={sectionCopy[3].id} align="left">{sectionCopy[3].heading}</SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{awardsCopy[0]}</p>
        <RevealGroup as="ul" className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3">
          {visibleAwards.map((award) => (
            <RevealItem as="li" key={award.name}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-surface">
                <Image src={award.image} alt={award.alt} fill sizes="(max-width: 767px) 45vw, 22rem" className="object-contain p-2" />
                <figcaption className="sr-only">{award.name}</figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
        {awards.length > 2 && (
          <button type="button" aria-expanded={showAll} onClick={() => setShowAll((current) => !current)} className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line px-6 font-display font-bold uppercase hover:bg-surface">
            {awardsCopy[1]}
          </button>
        )}
      </div>
    </section>
  );
}