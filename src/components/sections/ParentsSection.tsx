import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionCopy, parentFeature } from "@/data/page-content";
import { parentVideos } from "@/data/videos";

export function ParentsSection() {
  return (
    <section aria-labelledby="parents-title" className="bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id={sectionCopy[5].id} align="left">{sectionCopy[5].heading}</SectionHeading>
        <RevealGroup className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <RevealItem>
            <blockquote className="border-l-4 border-accent pl-5 font-accent text-2xl font-bold italic leading-relaxed text-primary-text sm:text-3xl">
              {parentFeature[0]}
            </blockquote>
          </RevealItem>
          <RevealGroup as="ul" className="grid grid-cols-3 gap-3 sm:gap-5">
            {parentVideos.map((video) => (
              <RevealItem as="li" key={video.id} className="mx-auto w-full max-w-52 rounded-[1.5rem] border-[5px] border-ink bg-ink p-1.5 shadow-xl">
                <video controls playsInline preload="none" poster={video.poster} aria-label={video.alt} className="aspect-[9/16] w-full rounded-[1rem] bg-black object-cover">
                  <source src={video.src} type="video/mp4" />
                </video>
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealGroup>
      </div>
    </section>
  );
}