import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { CircleImage } from "@/components/ui/CircleImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MapPin, Phone } from "lucide-react";
import { about } from "@/data/about";
import { contact } from "@/data/contact";
import { campus } from "@/data/images";
import { contactHeading, contactPanelCopy } from "@/data/page-content";
import { site } from "@/data/site";

export function About() {
  return (
    <section aria-labelledby="about-title" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <RevealGroup className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <RevealItem>
            <SectionHeading id="about-title" align="left">{about.title}</SectionHeading>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-muted">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <h3 className="mt-8 font-display text-2xl font-bold uppercase">{about.subtitle}</h3>
            <div className="mt-3 space-y-4 text-base leading-relaxed text-muted">
              {about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-8 text-xl font-semibold leading-relaxed text-fg">
              {about.intro.map((part, index) => part.accent ? (
                <span key={index} className="relative inline-block px-1 text-primary-text">
                  {part.text}
                  <svg aria-hidden="true" viewBox="0 0 320 54" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] overflow-visible">
                    <ellipse cx="160" cy="27" rx="155" ry="23" fill="none" stroke="var(--gold)" strokeWidth="3" strokeDasharray="5 3" />
                  </svg>
                </span>
              ) : <span key={index}>{part.text}</span>)}
            </p>
          </RevealItem>
          <RevealItem className="relative mt-6 lg:mt-16">
            <div className="absolute -right-3 -top-8 z-0 w-28 rounded-full border-4 border-gold p-1 sm:-right-5 sm:w-36">
              <CircleImage src={campus} alt="" sizes="144px" blob="#ffffff" />
            </div>
            <div className="relative z-10 grid gap-8 rounded-sm border border-line bg-bg p-5 shadow-xl sm:p-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase">{contactHeading[0]}</h3>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed">
                  <li>
                    <a href={contact.helpline.href} className="flex min-h-11 items-center gap-3 text-fg">
                      <Phone aria-hidden className="shrink-0 text-accent-text" size={18} />
                      <span>{contactPanelCopy[0]} {contact.helpline.display}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-3 text-fg">
                      <Mail aria-hidden className="shrink-0 text-accent-text" size={18} />
                      <span>{contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-3 py-2 text-fg">
                      <MapPin aria-hidden className="mt-1 shrink-0 text-accent-text" size={18} />
                      <span>{site.name}, {contact.address}</span>
                    </a>
                  </li>
                  <li className="flex min-h-11 items-center gap-3 text-fg">
                    <Phone aria-hidden className="shrink-0 text-accent-text" size={18} />
                    <span>{contactPanelCopy[1]} {contact.landlines.map((phone) => phone.display).join(", ")}</span>
                  </li>
                </ul>
              </div>
              <EnquiryForm />
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}