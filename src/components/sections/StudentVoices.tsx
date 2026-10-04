import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { voices, voicesHeading } from "@/data/voices";

function TealBurst() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="absolute -right-2 -top-2 h-16 w-16 text-accent sm:h-20 sm:w-20">
      <path
        d="M50 4v19m0 54v19M4 50h19m54 0h19M17.5 17.5l13.4 13.4m38.2 38.2 13.4 13.4m0-65-13.4 13.4M30.9 69.1 17.5 82.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <circle cx="50" cy="50" r="9" fill="currentColor" />
    </svg>
  );
}

export function StudentVoices() {
  return (
    <section aria-labelledby="voices-title" className="bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="voices-title" align="left">
          {voicesHeading.map((part, index) =>
            part.accent ? <em key={index}>{part.text}</em> : <span key={index}>{part.text}</span>,
          )}
        </SectionHeading>
        <RevealGroup as="ul" className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {voices.map((voice, index) => (
            <RevealItem
              as="li"
              key={voice.quote}
              className={`relative max-w-2xl ${index === 1 ? "lg:mt-16 lg:justify-self-end" : ""}`}
            >
              <TealBurst />
              <div className={`relative z-10 grid items-center gap-5 sm:grid-cols-[1fr_0.8fr] ${index === 1 ? "sm:grid-cols-[0.8fr_1fr]" : ""}`}>
                <blockquote className={index === 1 ? "sm:order-2" : ""}>
                  <p className="font-display text-3xl font-bold uppercase leading-tight text-primary-text">{voice.quote}</p>
                  <p className="mt-5 text-base leading-relaxed text-muted">{voice.body}</p>
                </blockquote>
                <div className={`relative mx-auto aspect-square w-full max-w-56 ${index === 1 ? "sm:order-1" : ""}`}>
                  <Image src={voice.image} alt="" fill sizes="(max-width: 639px) 65vw, 14rem" className="object-contain" />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}