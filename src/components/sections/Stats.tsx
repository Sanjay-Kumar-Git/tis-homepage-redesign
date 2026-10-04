import Image from "next/image";
import { CountUp } from "@/components/animation/CountUp";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats, statsIntro } from "@/data/stats";

const copy = statsIntro[0];
const framedPhotos = [
  { src: "/images/activities/music-practice.webp", alt: "" },
  { src: "/images/activities/health-room.webp", alt: "" },
];

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="stats-title" align="left">
          {copy.heading}
        </SectionHeading>
        <p className="mt-7 max-w-4xl text-base leading-relaxed text-muted">{copy.body}</p>
        <div className="mt-12 grid items-center gap-6 xl:grid-cols-[minmax(10rem,0.7fr)_minmax(0,3fr)_minmax(10rem,0.7fr)]">
          <figure className="relative hidden aspect-[4/5] overflow-hidden rounded-sm border-[6px] border-white shadow-lg xl:block">
            <Image src={framedPhotos[0].src} alt={framedPhotos[0].alt} fill sizes="(min-width: 1280px) 15rem, 0px" className="object-cover" />
          </figure>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem as="li" key={stat.label} className="border-t border-line pt-5">
                <Image src={stat.image} alt="" width={52} height={52} sizes="52px" className="h-13 w-13 object-contain" />
                <p className="mt-3 font-display text-6xl font-extrabold leading-none">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 max-w-40 font-display text-base font-bold uppercase">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <figure className="relative hidden aspect-[4/5] overflow-hidden rounded-sm border-[6px] border-white shadow-lg xl:block">
            <Image src={framedPhotos[1].src} alt={framedPhotos[1].alt} fill sizes="(min-width: 1280px) 15rem, 0px" className="object-cover" />
          </figure>
        </div>
        <p className="mt-10 font-accent text-2xl font-bold italic text-accent-text">{copy.closing}</p>
      </div>
    </section>
  );
}