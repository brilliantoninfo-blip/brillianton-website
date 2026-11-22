import type { FaqItem } from "./faq";

/**
 * Search-focused guide pages. Each targets what students and parents actually search for,
 * and every claim is drawn from Brillianton's own verified material.
 */
export type Guide = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  accent: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; body?: string; points?: { title: string; text: string }[] }[];
  programme: { name: string; href: string; line: string };
  related: { label: string; href: string; external?: boolean }[];
  faqs: FaqItem[];
};

export const guides: Guide[] = [
  {
    slug: "top-university-admissions",
    metaTitle: "Premium University Admission Mentorship Program — Oxford, Cambridge, Ivy League & QS Top 100",
    metaDescription:
      "A premium university admission mentorship program from Kerala for Grades 8–12 students aiming at Oxford, Cambridge, the Ivy League and QS Top 100 universities — profile building, research exposure, application strategy and interview preparation.",
    keywords: [
      "premium university admission mentorship program",
      "admission to top universities abroad",
      "Oxford Cambridge admission guidance India",
      "Ivy League admission mentorship India",
      "QS top 100 university admission help",
      "premium university admission Kerala",
      "university admission counselling Calicut",
    ],
    eyebrow: "Top university admissions",
    h1: "Oxford, Cambridge & Ivy League admissions",
    accent: "start years before you apply.",
    intro:
      "Brillianton's Mission QS100 is a premium university admission mentorship program for Grades 8–12 students aiming at Oxford, Cambridge, the Ivy League and other QS Top 100 universities — guided by mentors who have studied and researched at leading institutions.",
    image: "/brand/dream-globally.jpg",
    imageAlt: "A graduate in cap and gown looking up at a domed historic university building",
    sections: [
      {
        heading: "What leading universities look for",
        body:
          "Admissions differ by country — interviews and subject depth in the UK, breadth and essays in the US — but they share one question: will this student thrive here and contribute? Strong grades open the door. Sustained curiosity, genuine initiative and a coherent personal story decide who walks through it. Those take years to build, which is why mentorship should start well before the application.",
      },
      {
        heading: "How Mission QS100 prepares students",
        points: [
          { title: "Profile building", text: "Leadership, community initiatives and differentiated extracurricular impact, built over time." },
          { title: "Research exposure", text: "Mentored projects, intellectual inquiry and pathways toward publication." },
          { title: "Application strategy", text: "Personal narrative, university list, portfolio refinement and interview simulations." },
          { title: "Global readiness", text: "Academic writing rigour, cultural adaptation and future-ready skills." },
        ],
      },
      {
        heading: "A structured, long-term cohort",
        body:
          "Mission QS100 runs as a 10-month structured mentorship cohort (2026–27). Every mentee works with a mentor and follows an individual roadmap through four stages: explore, prepare, elevate and launch.",
      },
    ],
    programme: { name: "Mission QS100", href: "/programmes#mission-qs100", line: "For Grades 8–12 · 10-month structured cohort" },
    related: [
      { label: "What leading universities look for in a school student", href: "/insights/what-leading-universities-look-for" },
      { label: "Why mentorship has to begin before the application", href: "/insights/mentorship-before-the-application" },
      { label: "Find your pathway in one minute", href: "/pathway-finder" },
    ],
    faqs: [
      {
        q: "When should my child start preparing for Oxford, Cambridge or the Ivy League?",
        a: "Grade 8 or 9 is ideal. It leaves time to build genuine depth in research, leadership and competitions, so the application presents something real rather than something assembled in the final term.",
      },
      {
        q: "Is Mission QS100 only for students aiming at Oxford or Harvard?",
        a: "No. It is designed for students aspiring to any QS Top 100 university, including Oxford, Cambridge and the Ivy League, and the university list is shaped around each student.",
      },
      {
        q: "Do you guarantee admission to a top university?",
        a: "No one honestly can. Admission decisions rest with universities. Mission QS100 provides structured, expert mentorship so each student presents the strongest version of their candidacy.",
      },
    ],
  },
  {
    slug: "scholarship-guidance",
    metaTitle: "Fully Funded Scholarship & Fellowship Guidance: Fulbright, Chevening, DAAD, Erasmus Mundus",
    metaDescription:
      "Mentorship for fully funded international fellowships and scholarships — Fulbright, Chevening, Commonwealth, DAAD and Erasmus Mundus — led by fellowship alumni and researchers. Eligibility mapping, SOP and interview preparation.",
    keywords: [
      "fully funded scholarship guidance India",
      "Fulbright Chevening application help",
      "DAAD Erasmus Mundus guidance Kerala",
      "scholarship for masters abroad mentorship",
      "SOP guidance for scholarships",
      "fellowship mentorship India",
    ],
    eyebrow: "Scholarships & fellowships",
    h1: "Fully funded scholarships",
    accent: "mentored by people who won them.",
    intro:
      "Future Fellows helps undergraduates, postgraduates and young professionals prepare for premier, fully funded international fellowships — with eligibility mapping, narrative building and mock interviews led by fellowship alumni and researchers.",
    image: "/brand/graduate-walking.jpg",
    imageAlt: "Illustration of a graduate in academic robes walking forward with a book",
    sections: [
      {
        heading: "The fellowships we prepare mentees for",
        points: [
          { title: "Fulbright-Nehru Fellowships — USA", text: "The flagship India–US exchange for master's study, doctoral research, teaching and professional development, administered in India by USIEF." },
          { title: "Chevening Scholarships — UK", text: "The UK government's global scholarship programme for one-year master's degrees, for people with demonstrated leadership potential." },
          { title: "Commonwealth Scholarships — UK", text: "UK-funded master's and PhD scholarships for talented candidates from Commonwealth countries." },
          { title: "DAAD — Germany", text: "The German Academic Exchange Service funds master's study, doctoral research and research stays in Germany." },
          { title: "Erasmus Mundus Joint Masters — Europe", text: "Integrated master's programmes with study in at least two European countries, offered by university consortia." },
        ],
      },
      {
        heading: "How Future Fellows mentorship works",
        points: [
          { title: "Eligibility mapping", text: "Matching each mentee to the fellowships that genuinely fit their field, stage and goals — a full cycle ahead." },
          { title: "Narrative construction", text: "Statements of purpose and essays that are specific, honest and forward-looking." },
          { title: "Mock interviews", text: "Interview preparation led by awardees and researchers who have been through these processes." },
          { title: "100 Dreams, 100 Fellowships", text: "Strategic preparation for ambitious students across partner colleges, including the Global Fellowship Orientation workshop series." },
        ],
      },
      {
        heading: "Always check the official source",
        body:
          "Eligibility, funding and deadlines change every cycle. We link to each programme's official website and help mentees plan against the current requirements.",
      },
    ],
    programme: { name: "Future Fellows", href: "/programmes#future-fellows", line: "For undergraduates, postgraduates & young professionals" },
    related: [
      { label: "Five international fellowships every ambitious graduate should know", href: "/insights/five-fellowships-to-know" },
      { label: "Writing a Statement of Purpose that sounds like you", href: "/insights/writing-a-statement-of-purpose" },
      { label: "Global Fellowship Orientation sessions", href: "/insights#sessions" },
    ],
    faqs: [
      {
        q: "Which fully funded scholarships can Brillianton help me prepare for?",
        a: "Future Fellows focuses on Fulbright, Chevening, Erasmus Mundus, Commonwealth and DAAD, along with other international fellowships and research pathways that fit a mentee's goals.",
      },
      {
        q: "How early should I start preparing for a fellowship?",
        a: "At least one full application cycle ahead. Requirements such as work experience, research or leadership evidence take time to build, and strong statements need several drafts.",
      },
      {
        q: "Who are the mentors for scholarship applications?",
        a: "Fellowship alumni and researchers, including Fulbright Scholars, an Erasmus Mundus Scholar, a Fulbright post-doctoral fellow at UCLA and a Stanford PhD research scholar.",
      },
    ],
  },
  {
    slug: "study-abroad-mentorship-kerala",
    metaTitle: "Study Abroad Mentorship in Kerala — Calicut (Kozhikode) | Brillianton",
    metaDescription:
      "Looking for study abroad guidance in Kerala? Brillianton is an international academic mentorship organisation in Calicut (Kozhikode) — long-term mentorship for top universities, scholarships and fellowships, with sessions across Kerala.",
    keywords: [
      "study abroad consultants Kerala",
      "study abroad guidance Calicut",
      "overseas education Kozhikode",
      "foreign university admission help Kerala",
      "study abroad mentorship Malappuram",
      "best study abroad guidance Kerala",
    ],
    eyebrow: "Study abroad mentorship · Kerala",
    h1: "Study abroad guidance in Kerala,",
    accent: "built on mentorship.",
    intro:
      "Brillianton Global Education is based at HiLite Business Park, Calicut. Rather than one-off counselling, we mentor students from Kerala over months and years toward the world's leading universities, scholarships and fellowships.",
    image: "/brand/campus-2.jpg",
    imageAlt: "A Brillianton mentor speaking to students at a Global Futures session in Kerala",
    sections: [
      {
        heading: "Mentorship, not a study-abroad agency",
        body:
          "Most study-abroad services meet students at the application. We start earlier: building the academic profile, research, leadership and story that strong applications are made of. Our mentors are fellowship alumni and researchers — not sales agents.",
      },
      {
        heading: "Across Kerala, on campus and online",
        points: [
          { title: "Global Futures sessions", text: "Hosted at Escola International, The Global Public School and Shaziya International Campus." },
          { title: "Partner colleges", text: "Future Fellows works alongside PSMO College, Providence Women's College and MEA College of Arts & Science." },
          { title: "Digital cohorts", text: "Mentorship runs online across India, reinforced by on-campus summits and workshops." },
          { title: "Calicut headquarters", text: "Meet the team at HiLite Business Park, Calicut, Kerala." },
        ],
      },
      {
        heading: "Two pathways",
        body:
          "Mission QS100 for Grades 8–12 students aiming at Oxford, Cambridge, the Ivy League and QS Top 100 universities, and Future Fellows for undergraduates, postgraduates and professionals preparing for fully funded fellowships.",
      },
    ],
    programme: { name: "Our programmes", href: "/programmes", line: "Mission QS100 · Future Fellows · For institutions" },
    related: [
      { label: "Every session we've run across Kerala", href: "/insights#sessions" },
      { label: "Find your pathway in one minute", href: "/pathway-finder" },
      { label: "Contact the Calicut team", href: "/contact" },
    ],
    faqs: [
      {
        q: "Where is Brillianton located?",
        a: "Our headquarters is at HiLite Business Park, Calicut (Kozhikode), Kerala. Mentorship runs both on campus at partner institutions and online across India.",
      },
      {
        q: "How is Brillianton different from study abroad consultants?",
        a: "We are a mentorship organisation. Instead of focusing only on applications, we guide students over the long term — profile, research, leadership, narrative and interviews — with mentors who have earned these opportunities themselves.",
      },
      {
        q: "Can I meet the team in Calicut?",
        a: "Yes. Message us on WhatsApp at +91 97781 17553 or email info@brilliantonedu.com to arrange a conversation.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
