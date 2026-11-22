import Hero from "@/sections/home/Hero";
import Vision from "@/sections/home/Vision";
import Programmes from "@/sections/home/Programmes";
import MeetBrill from "@/sections/home/MeetBrill";
import Opportunities from "@/sections/home/Opportunities";
import WhyBrillianton from "@/sections/home/WhyBrillianton";
import Approach from "@/sections/home/Approach";
import Mentors from "@/sections/home/Mentors";
import InsightsPreview from "@/sections/home/InsightsPreview";
import FinalCTA from "@/sections/home/FinalCTA";
import InstagramWall from "@/sections/home/InstagramWall";
import CampusMoments from "@/sections/home/CampusMoments";
import PathwaySection from "@/sections/home/PathwaySection";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Programmes />
      <PathwaySection />
      <MeetBrill />
      <Opportunities />
      <WhyBrillianton />
      <Approach />
      <CampusMoments />
      <Mentors />
      <InsightsPreview />
      <InstagramWall />
      <FAQ />
      <FinalCTA />
    </>
  );
}
