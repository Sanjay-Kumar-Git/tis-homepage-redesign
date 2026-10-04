import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { Collaborations } from "@/components/sections/Collaborations";
import { FutureSection } from "@/components/sections/FutureSection";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { Hero } from "@/components/sections/Hero";
import { ParentsSection } from "@/components/sections/ParentsSection";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { Rankings } from "@/components/sections/Rankings";
import { Sports } from "@/components/sections/Sports";
import { Stats } from "@/components/sections/Stats";
import { StudentVoices } from "@/components/sections/StudentVoices";
import { VirtualTour } from "@/components/sections/VirtualTour";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <StudentVoices />
        <Sports />
        <FutureSection />
        <Stats />
        <Rankings />
        <PeopleSection />
        <AwardsSection />
        <VirtualTour />
        <ParentsSection />
        <GoogleReviews />
        <Collaborations />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
