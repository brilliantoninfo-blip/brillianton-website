/** Pathway finder: turns quiz answers into a recommended programme. Kept free of React so it can be tested. */
export type Answers = Partial<Record<"who" | "stage" | "goal" | "region" | "timing", string>>;

export type Result = {
  programme: string;
  href: string;
  interest: string;
  headline: string;
  why: string;
  explore: { label: string; href: string; external?: boolean }[];
};

const regionFellowships: Record<string, { label: string; href: string; external?: boolean }[]> = {
  usa: [{ label: "Fulbright-Nehru Fellowships (USA)", href: "https://www.usief.org.in/", external: true }],
  uk: [
    { label: "Chevening Scholarships (UK)", href: "https://www.chevening.org/", external: true },
    { label: "Commonwealth Scholarships (UK)", href: "https://cscuk.fcdo.gov.uk/", external: true },
  ],
  europe: [
    { label: "Erasmus Mundus Joint Masters (Europe)", href: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", external: true },
    { label: "DAAD Scholarships (Germany)", href: "https://www.daad.de/en/", external: true },
  ],
  any: [{ label: "Five international fellowships to know", href: "/insights/five-fellowships-to-know" }],
};

export function decide(a: Answers): Result {
  const forWhom = a.who === "parent" ? "your child" : "you";
  if (a.who === "institution") {
    return {
      programme: "Go Global for Institutions",
      href: "/programmes#institutions",
      interest: "Institutional partnership",
      headline: "Bring global exposure to your campus.",
      why: "Brillianton partners with schools and colleges for Global Futures summits, orientation workshops, school twinning, MoUs, exchanges and summer schools — acting as the international relations desk you may not yet have.",
      explore: [
        { label: "Programmes for institutions", href: "/programmes#institutions" },
        { label: "Every session we've run", href: "/insights#sessions" },
      ],
    };
  }
  const school = a.stage === "g8-10" || a.stage === "g11-12";
  if (school) {
    const early = a.stage === "g8-10";
    return {
      programme: "Mission QS100",
      href: "/programmes#mission-qs100",
      interest: "Mission QS100",
      headline: early ? "Perfect timing to build a standout profile." : "Time to turn ambition into a strong application.",
      why: `Mission QS100 is a structured mentorship pathway for Grades 8–12 aiming at Oxford, Cambridge, the Ivy League and QS Top 100 universities. ${
        early ? `Starting now gives ${forWhom} years to build real research, leadership and depth.` : `Mentors will help ${forWhom} sharpen the profile, university list, narrative and interviews.`
      }`,
      explore: [
        { label: "What leading universities look for", href: "/insights/what-leading-universities-look-for" },
        { label: "Why mentorship starts before the application", href: "/insights/mentorship-before-the-application" },
        ...(a.goal === "exposure" ? [{ label: "Summer schools & global immersions", href: "/programmes#institutions" }] : []),
      ],
    };
  }
  if (a.stage === "ug" && a.goal === "exposure") {
    return {
      programme: "Leadership School Finland 2026",
      href: "/insights/leadership-school-finland-2026",
      interest: "Leadership School Finland 2026",
      headline: "Start with a short, powerful step abroad.",
      why: "Eight days with JAMK University of Applied Sciences in Finland — three courses and three European credits in AI, Entrepreneurship and Business Communication. Future Fellows can then prepare you for funded postgraduate study.",
      explore: [
        { label: "Leadership School Finland 2026 details", href: "/insights/leadership-school-finland-2026" },
        { label: "Future Fellows programme", href: "/programmes#future-fellows" },
      ],
    };
  }
  return {
    programme: "Future Fellows",
    href: "/programmes#future-fellows",
    interest: "Future Fellows",
    headline: a.goal === "unsure" ? "Let's find the fellowship that fits." : "Your fully funded pathway starts with the right mentor.",
    why: `Future Fellows prepares undergraduates, postgraduates and young professionals for premier fully funded fellowships, with eligibility mapping, narrative building and mock interviews led by fellowship alumni.${
      a.timing === "now" ? " Many requirements take a full cycle to build, so starting now is a real advantage." : ""
    }`,
    explore: [...(regionFellowships[a.region ?? "any"] ?? regionFellowships.any), { label: "Writing a Statement of Purpose that sounds like you", href: "/insights/writing-a-statement-of-purpose" }],
  };
}

