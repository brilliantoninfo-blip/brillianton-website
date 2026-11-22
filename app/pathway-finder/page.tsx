import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PathwayFinder from "@/components/PathwayFinder";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Pathway Finder — Which Study Abroad or Scholarship Pathway Fits You?",
  description: "Answer five quick questions to find your Brillianton pathway — Mission QS100, Future Fellows, Leadership School Finland or programmes for institutions.",
  alternates: { canonical: "/pathway-finder" },
};

export default function PathwayFinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Pathway finder"
        title="Find your"
        accent="pathway."
        intro="Five quick questions for students, parents and institutions. You'll get a recommended pathway, what to explore first, and a one-tap way to talk to the team."
      />
      <section className="bg-paper py-20 sm:py-28">
        <div className="frame max-w-5xl">
          <PathwayFinder />
        </div>
      </section>
      <FAQ />
    </>
  );
}
