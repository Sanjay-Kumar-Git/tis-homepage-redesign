import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";
import { sectionCopy, tourCopy } from "@/data/page-content";
import { campus } from "@/data/images";

export function VirtualTour() {
  return (
    <section aria-labelledby="tour-title" className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Image src={campus} alt="" fill sizes="100vw" className="object-cover opacity-55" />
      </div>
      <Link href={contact.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-[22rem] items-end justify-between gap-6 px-6 py-12 focus-visible:outline-offset-4 sm:min-h-[30rem] sm:px-12 sm:py-16">
        <div>
          <SectionHeading id={sectionCopy[4].id} align="left" className="text-white">
            <span>{sectionCopy[4].heading}</span>
            <br />
            <em className="text-white">{tourCopy[0]}</em>
          </SectionHeading>
        </div>
        <span aria-hidden="true" className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={24} />
        </span>
      </Link>
    </section>
  );
}