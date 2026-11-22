/**
 * Single source of truth for Brillianton content.
 * Everything here comes from Brillianton's own material (brochure, company deck,
 * existing website) — keep it that way: no invented stats, partners or contacts.
 */

export const site = {
  name: "Brillianton Global Education",
  shortName: "Brillianton",
  url: "https://www.brilliantonedu.com", // primary domain on Vercel; the bare domain redirects here
  tagline: "Global vision. Personal guidance.",
  description:
    "Brillianton Global Education runs a premium university admission mentorship program for students aiming at Oxford, Cambridge, the Ivy League and QS Top 100 universities, plus mentorship for fully funded fellowships and scholarships — from Calicut, Kerala.",
  email: "info@brilliantonedu.com",
  phone: "+91 97781 17553",
  phoneHref: "tel:+919778117553",
  whatsapp: "https://wa.me/919778117553",
  address: { line1: "HiLite Business Park", city: "Calicut", region: "Kerala", country: "India" },
  instagram: "https://www.instagram.com/brilliantonglobal/",
  instagramHandle: "@brilliantonglobal",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programmes", label: "Our Programmes" },
  { href: "/opportunities", label: "Global Opportunities" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/** Unsplash photography (free licence). The `.duotone` class brands them. */
const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos = {
  gothicQuad: u("1569447891824-7a1758aa73a2"),
  columns: u("1559135197-8a45ea74d367"),
  redBrick: u("1622397333309-3056849bc70b"),
  curvedLibrary: u("1568667256549-094345857637"),
  libraryStudent: u("1427504494785-3a9ca7044f45"),
  capToss: u("1541339907198-e08756dedf3f", 2400),
  openBook: u("1532012197267-da84d127e765"),
  glassLibrary: u("1564981797816-1043664bf78d"),
};

export type Programme = {
  slug: string;
  name: string;
  nameParts: [string, string];
  audience: string;
  duration: string;
  summary: string;
  promise: string;
  focus: { title: string; detail: string }[];
  targets: string[];
  image: string;
};

export const programmes: Programme[] = [
  {
    slug: "mission-qs100",
    name: "Mission QS100",
    nameParts: ["Mission", "QS100"],
    audience: "Grades 8–12",
    duration: "10-month structured cohort · 2026–27",
    summary:
      "A long-term mentorship pathway that helps school students build strong academic profiles and prepare, step by step, for admission to leading global universities.",
    promise: "From first ambition to final application — with a mentor and an individual roadmap at every stage.",
    focus: [
      { title: "Academic profile development", detail: "A distinctive profile built over years, not assembled in the final term." },
      { title: "Research exposure", detail: "Mentored projects and genuine intellectual inquiry, with pathways toward publication." },
      { title: "Leadership development", detail: "Community initiatives and leadership roles that show real, sustained impact." },
      { title: "Competitions", detail: "Choosing the right olympiads, challenges and contests, and preparing for them well." },
      { title: "Global university preparation", detail: "University lists, personal narrative, portfolio refinement and interview simulations." },
      { title: "Future-ready skills", detail: "Academic writing rigour, cultural adaptation and the habits that matter after admission." },
    ],
    targets: ["Oxford", "Cambridge", "Ivy League", "QS Top 100"],
    image: "/brand/qs100-badge.jpg",
  },
  {
    slug: "future-fellows",
    name: "Future Fellows",
    nameParts: ["Future", "Fellows"],
    audience: "Undergraduates, postgraduates & young professionals",
    duration: "Alumni-led mentorship",
    summary:
      "A mentorship pathway toward international fellowships, scholarships and global academic opportunities — guided by people who have earned them.",
    promise: "Eligibility mapping, narrative building, applications and interviews, mentored by fellowship alumni and researchers.",
    focus: [
      { title: "International scholarship discovery", detail: "Finding the fellowships that genuinely match your field, stage and goals." },
      { title: "Fellowship preparation", detail: "Eligibility mapping and a realistic timeline for each application cycle." },
      { title: "Profile development", detail: "Research, leadership and service that strengthen your candidacy." },
      { title: "Statement of Purpose guidance", detail: "Narrative construction that sounds like you and reads with clarity." },
      { title: "Application strategy", detail: "Sequencing applications, references and documents without last-minute panic." },
      { title: "Expert mentorship", detail: "Mock interviews and feedback from Fulbright, Chevening and Erasmus Mundus alumni." },
    ],
    targets: ["Fulbright", "Chevening", "Erasmus Mundus", "Commonwealth", "DAAD"],
    image: "",
  },
];

export const institutionServices = {
  schools: {
    title: "Go Global School Network",
    lead: "For schools building global exposure into the academic year — not bolting it on.",
    items: [
      "Global Futures Summits and workshops on campus",
      "School twinning and partnerships with international schools",
      "Student pathways to summer schools in India and abroad",
      "Upskilling and professional development for teachers and leaders",
    ],
  },
  colleges: {
    title: "International Relations Desk",
    lead: "For colleges and universities that do not yet have an international office of their own.",
    items: [
      "MoUs and partnership agreements with international universities, drafted and tracked end to end",
      "Design and coordination of student and faculty exchange programmes",
      "Summer schools and global immersions, hosted or attended",
      "Support for internationalisation metrics and global citizenship standards",
    ],
  },
};

export const approach = [
  { step: "Discover", line: "Understand the student.", detail: "Interests, strengths, ambitions and the destinations worth aiming for — mapped honestly before anything is planned." },
  { step: "Develop", line: "Build real substance.", detail: "Research exposure, leadership, competitions and skills, developed over time with a mentor alongside." },
  { step: "Prepare", line: "Shape the story.", detail: "University and fellowship lists, personal narrative, portfolio and interview readiness." },
  { step: "Apply", line: "Execute with clarity.", detail: "Statements, documents, references and deadlines — structured so nothing is left to the last week." },
  { step: "Progress", line: "Keep moving forward.", detail: "Mentorship continues beyond results: transitions, next opportunities and long-term growth." },
];

export const pillars = [
  { title: "Expert mentorship", detail: "Mentors are fellowship alumni and researchers — Fulbright, Erasmus Mundus and doctoral scholars — not sales agents." },
  { title: "Personalised guidance", detail: "Every mentee follows an individual roadmap shaped around who they are, not a template." },
  { title: "Global academic exposure", detail: "Webinars, summits, summer schools and conversations with people already studying abroad." },
  { title: "Structured development", detail: "Clear stages and milestones, so growth is deliberate rather than accidental." },
  { title: "Application support", detail: "Statements, lists, documents and interviews, prepared carefully and on time." },
  { title: "Long-term planning", detail: "Support that can run from Grade 8 through postgraduate fellowships." },
];

export type Mentor = { name: string; role: string; focus: string; photo?: string };

export const mentors: Mentor[] = [
  { name: "Dr. M Sihabudheen", role: "Fulbright Scholar (2018–19), Columbia University, New York", focus: "Global higher education strategy", photo: "/mentors/m-sihabudheen.jpg" },
  { name: "Dr. Ilyas M", role: "Fulbright Scholar", focus: "Research methodology & competitive admissions", photo: "/mentors/ilyas-m.jpg" },
  { name: "Farseen Ali", role: "Erasmus Mundus Scholar", focus: "European research networks & academic mobility", photo: "/mentors/farseen-ali.jpg" },
  { name: "Dr. Mohamed Haseeb N", role: "Fulbright Post-Doctoral Fellow, UCLA · Assistant Professor, PSMO College", focus: "Research careers" },
  { name: "Naseef Parasserl", role: "PhD Research Scholar, Stanford University", focus: "STEM research & US admissions", photo: "/mentors/naseef-parasserl.jpg" },
  { name: "Mohammed Nizar", role: "Senior Engineer, Norwegian Maritime Authority", focus: "Global technical careers" },
];

export type Webinar = {
  title: string;
  series: string;
  date: string;
  speakers: { name: string; credential: string }[];
  recordings: { title: string; url: string }[];
  poster: string;
};

export const webinars: Webinar[] = [
  {
    title: "Unlock your path to Oxford, Manchester & Chevening",
    series: "Achievers' Dialogue · Session 2",
    date: "24 January 2026",
    speakers: [
      { name: "Maknoon Wani", credential: "Chevening Scholar (2023–24), University of Oxford" },
      { name: "Amiya Sur", credential: "Chevening Scholar (2022–23), University of Manchester" },
    ],
    recordings: [
      { title: "Maknoon Wani — Part 1", url: "https://youtu.be/VhBIMX4VkmM" },
      { title: "Amiya Sur — Part 2", url: "https://youtu.be/hREIspOhsBI" },
    ],
    poster: "/webinar-posters/session-2-amiya-sur.jpg",
  },
  {
    title: "Meet those who made it happen",
    series: "Achievers' Dialogue · Session 1",
    date: "27 December 2025",
    speakers: [
      { name: "Rajaneesh Rajan", credential: "Chevening Scholar (2021–22), University of Sussex" },
      { name: "Eknath Wagh", credential: "MPP Candidate (2025–27), Harvard University" },
      { name: "Farseen Ali P", credential: "Erasmus Mundus Joint Master (2022–24)" },
    ],
    recordings: [
      { title: "Part 1", url: "https://youtu.be/xcZ1CeV62_0" },
      { title: "Part 2", url: "https://youtu.be/rALI_s46s9E" },
      { title: "Part 3", url: "https://youtu.be/-eDAsFpenLI" },
    ],
    poster: "/webinar-posters/session-1-poster.jpg",
  },
];

export const fellowshipsTicker = ["Fulbright", "Chevening", "DAAD", "Erasmus Mundus", "Commonwealth", "Oxford", "Cambridge", "Ivy League", "QS Top 100"];

/** Recent posters from @brilliantonglobal (downloaded from the live feed; each links to its post). */
export const instagramPosts = [
  { src: "/instagram/post-1.jpg", href: "https://www.instagram.com/p/DfFMfqpiLKu/", alt: "Global Fellowship Orientation workshop, session 5: Fulbright Fellowships, 31 October 2026" },
  { src: "/instagram/post-2.jpg", href: "https://www.instagram.com/p/De_7oJCzwym/", alt: "Career Futura at CIGI Kozhikode: Scholarships Beyond Borders with Dr. M Sihabudheen, Fulbright Scholar" },
  { src: "/instagram/post-3.jpg", href: "https://www.instagram.com/p/DezWJEEiiEZ/", alt: "Global Fellowship Orientation workshop, session 4: DAAD Scholarships with V V Arfitha, DAAD Scholar" },
  { src: "/instagram/post-4.jpg", href: "https://www.instagram.com/p/DeftJnECDF6/", alt: "Pathway to Top Global Universities orientation with Aizer Academy and Dr. M Sihabudheen, 17 October 2026" },
  { src: "/instagram/post-5.jpg", href: "https://www.instagram.com/p/DeEHmR8C3uO/", alt: "Global Fellowship Orientation workshop, session 3: Erasmus Mundus scholarships with Farseen Ali" },
  { src: "/instagram/post-6.jpg", href: "https://www.instagram.com/p/DdjHwmViDYN/", alt: "Thank-you talk clip from the Global Fellowship Orientation workshop series inaugural session" },
  { src: "/instagram/post-7.jpg", href: "https://www.instagram.com/p/DdXvBpoC9fe/", alt: "Global Fellowship Orientation workshop, session 2: Commonwealth Scholarship with Saba Ameer" },
  { src: "/instagram/post-8.jpg", href: "https://www.instagram.com/p/DdVsMSXiRfv/", alt: "Congratulations to Ameerali PC, selected for the 2026 Trinity Leadership Fellows Cohort" },
];
