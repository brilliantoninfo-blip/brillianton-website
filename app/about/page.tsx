import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Eyebrow, LineLink, Reveal } from "@/components/ui/primitives";
import { MentorGrid } from "@/sections/home/Mentors";
import MeetBrill from "@/sections/home/MeetBrill";
import WhyBrillianton from "@/sections/home/WhyBrillianton";
import FinalCTA from "@/sections/home/FinalCTA";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — International Academic Mentorship in Calicut, Kerala",
  description:
    "Brillianton Global Education is an international academic mentorship organisation at HiLite Business Park, Calicut — mentoring students for top global universities, scholarships and fellowships, and helping institutions go global.",
  alternates: { canonical: "/about" },
};

const ecosystem = [
  {
    label: "Pillar one",
    title: "Students & families",
    items: [
      "School students in Grades 8–12 aiming for the world's top-ranked universities",
      "Undergraduates and graduates targeting international fellowships and postgraduate study",
      "Families seeking a trusted, long-term academic partner rather than a one-time consultant",
    ],
  },
  {
    label: "Pillar two",
    title: "Schools, colleges & universities",
    items: [
      "Schools seeking international partnerships, global programmes and campus events",
      "Colleges pursuing internationalisation, summer schools and student mobility",
      "Institutions that need a dedicated international relations partner for MoUs and exchanges",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Brillianton"
        title="Global vision."
        accent="Personal guidance."
        intro="Brillianton Global Education helps ambitious students reach the world's leading universities and fellowships, and helps schools and colleges build genuine international ecosystems — through structured mentorship rather than one-off counselling."
        image="/brand/event-booth.jpg"
        imageAlt="Students at the Brillianton Global Education stand at an education fair"
      />

      {/* Who we are */}
      <section className="relative bg-paper py-28 sm:py-36">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="01" className="text-royal">
              Who we are
            </Eyebrow>
            <Reveal>
              <h2 className="mt-8 text-display font-semibold text-ink">
                An imagined city of <span className="italic-serif text-royal">brilliance.</span>
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/70 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p>
                Brillianton is built on one idea: that global opportunities require preparation, direction and mentorship. Not paperwork at the last minute — but years of deliberate growth with someone who knows the way.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                We offer personal guidance, research exposure and global networks that stay with a student from first ambition to final admission. Our mentors are fellowship alumni, doctoral researchers and international professionals — not sales agents.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-2xl font-semibold leading-snug text-ink">
                We don&apos;t prepare students only for admissions. <span className="italic-serif text-royal">We prepare them for global success.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two-pillar ecosystem */}
      <section className="bg-white py-28 sm:py-36">
        <div className="frame">
          <Eyebrow index="02" className="text-royal">
            Who we serve
          </Eyebrow>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ecosystem.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <article className={`h-full rounded-[32px] p-8 sm:p-12 ${i === 0 ? "bg-royal text-white" : "bg-ink text-white"}`}>
                  <p className="eyebrow text-sun">{e.label}</p>
                  <h3 className="display-wide mt-6 text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">{e.title}</h3>
                  <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
                    {e.items.map((it) => (
                      <li key={it} className="py-4 text-white/85">
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MeetBrill />

      {/* Mentors */}
      <section id="mentors" className="bg-paper py-28 sm:py-36">
        <div className="frame">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="03" className="text-royal">
                Scholar faculty
              </Eyebrow>
              <h2 className="mt-8 text-display font-semibold text-ink">
                World-class scholars, <span className="italic-serif text-royal">one-to-one.</span>
              </h2>
            </div>
            <p className="text-lg text-ink/65 lg:col-span-5">Direct mentorship from distinguished international fellowship alumni and researchers.</p>
          </div>
          <div className="mt-14">
            <MentorGrid />
          </div>
        </div>
      </section>

      {/* On the ground */}
      <section className="bg-white py-28 sm:py-36">
        <div className="frame grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="arch relative aspect-[3/4] overflow-hidden bg-[#103cbf] ring-4 ring-sun">
              <Image src="/brand/campus-2.jpg" alt="A Brillianton mentor speaking to students at a Global Futures session" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_30%]" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow index="04" className="text-royal">
              On the ground
            </Eyebrow>
            <Reveal>
              <h2 className="mt-8 text-display font-semibold text-ink">
                From Calicut, <span className="italic-serif text-royal">to the world.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">
                Headquartered at HiLite Business Park, Calicut, Brillianton works with students across Kerala and beyond — through digital cohorts, on-campus summits, school and college workshops, and webinars with scholars from Oxford, Harvard, Manchester and more.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                Global Futures Summits have been hosted at Escola International, The Global Public School and Shaziya International Campus. Future Fellows works alongside PSMO College, Providence Women&apos;s College and MEA College of Arts & Science.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <LineLink href="/programmes#institutions" className="text-royal">
                Partner with us
              </LineLink>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyBrillianton />
      <FinalCTA />
    </>
  );
}
