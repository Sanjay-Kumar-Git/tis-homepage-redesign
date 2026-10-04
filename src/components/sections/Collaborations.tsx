import Image from "next/image";
import { Marquee } from "@/components/animation/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";
import { sectionCopy } from "@/data/page-content";

export function Collaborations() {
  return (
    <section aria-labelledby="collaborations-title" className="border-y border-line bg-surface py-12">
      <div className="mx-auto mb-8 max-w-6xl px-6">
        <SectionHeading id={sectionCopy[7].id} align="left">{sectionCopy[7].heading}</SectionHeading>
      </div>
      <Marquee duration={42}>
        {partners.map((partner) => (
          <div key={partner.id} className="mx-6 flex h-24 w-36 shrink-0 items-center justify-center rounded-sm border border-line bg-bg p-4 sm:mx-8 sm:w-44">
            <div className="relative h-20 w-32">
              <Image src={partner.image} alt={partner.alt} fill sizes="128px" className="object-contain" />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}