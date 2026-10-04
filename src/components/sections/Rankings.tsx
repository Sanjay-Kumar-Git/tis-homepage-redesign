import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageSections } from "@/data/home";
import { rankings } from "@/data/rankings";

export function Rankings() {
  return (
    <section aria-labelledby="rankings-title" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="rankings-title" align="left">
          {homepageSections[0].heading.map((part, index) => part.accent ? <em key={index}>{part.text}</em> : <span key={index}>{part.text}</span>)}
        </SectionHeading>
        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rankings.map((ranking) => (
            <RevealItem as="li" key={`${ranking.rank}-${ranking.scope}`}>
              <article className="h-full rounded-sm bg-primary p-6 text-center text-primary-fg">
                <p className="font-accent text-5xl font-black italic">{ranking.rank}</p>
                <h3 className="mt-2 font-accent text-xl font-bold italic">{ranking.scope}</h3>
                <p className="mt-2 text-sm leading-relaxed">{ranking.title}</p>
                {ranking.needsVerification && <span className="sr-only">This ranking needs verification.</span>}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}