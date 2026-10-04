"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useMounted } from "@/hooks/useMounted";
import { contact } from "@/data/contact";
import { futureCopy } from "@/data/page-content";
import { uiCopy } from "@/data/page-content";
import { campusVideos } from "@/data/videos";

export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { margin: "100px" });
  const shouldReduceMotion = useReducedMotion();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0, 0.45, 1], ["circle(20% at 50% 50%)", "circle(72% at 50% 50%)", "circle(100% at 50% 50%)"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!inView || shouldReduceMotion !== false) {
      video.pause();
      return;
    }
    void video.play().catch(() => undefined);
    return () => video.pause();
  }, [inView, shouldReduceMotion]);

  return (
    <section ref={sectionRef} aria-labelledby="future-title" className="relative isolate min-h-[78svh] overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={mounted && shouldReduceMotion === false ? { clipPath } : undefined}>
        <Image src="/images/campus.webp" alt="" fill sizes="100vw" className="object-cover" />
        <video ref={videoRef} muted loop playsInline preload="none" poster="/images/campus.webp" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover">
          <source src={campusVideos[1].src} media="(max-width: 767px)" type="video/mp4" />
          <source src={campusVideos[0].src} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl flex-col items-start justify-center px-6 py-24">
        <h2 id="future-title" className="max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
          {futureCopy[0]}
        </h2>
        <Button href={contact.applyUrl} variant="light" size="lg" cursorLabel={uiCopy[0].apply} className="mt-8">{uiCopy[0].apply}</Button>
      </div>
    </section>
  );
}