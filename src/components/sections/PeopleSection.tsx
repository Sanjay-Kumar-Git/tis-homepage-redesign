import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PeopleRail } from "@/components/sections/PeopleRail";
import { leaders, personalities } from "@/data/people";
import { personalitiesSubheading, sectionCopy } from "@/data/page-content";

export function PeopleSection() {
  return (
    <section aria-labelledby="personalities-title" className="bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <RevealGroup>
          <RevealItem>
            <SectionHeading id={sectionCopy[1].id} align="left">{sectionCopy[1].heading}</SectionHeading>
          </RevealItem>
        </RevealGroup>
        <PeopleRail label={personalitiesSubheading[0]} people={personalities} />
        <PeopleRail label={sectionCopy[2].heading} people={leaders} />
      </div>
    </section>
  );
}