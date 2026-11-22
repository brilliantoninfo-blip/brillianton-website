import { photos } from "./site";

export type InsightCategory =
  | "Scholarship Updates"
  | "Fellowship Opportunities"
  | "University Spotlight"
  | "Application Advice"
  | "Student Development";

export type Block = { type: "p"; text: string } | { type: "h"; text: string } | { type: "list"; items: string[] } | { type: "quote"; text: string };

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  readTime: string;
  image: string;
  body: Block[];
};

export const categories: InsightCategory[] = [
  "Scholarship Updates",
  "Fellowship Opportunities",
  "University Spotlight",
  "Application Advice",
  "Student Development",
];

export const insights: Insight[] = [
  {
    slug: "mentorship-before-the-application",
    title: "Why mentorship has to begin before the application",
    category: "Student Development",
    excerpt: "The strongest applications are not written in the final term. They are lived over years — and that is where mentorship matters most.",
    readTime: "4 min read",
    image: photos.libraryStudent,
    body: [
      { type: "p", text: "Most students meet international education at the moment of application: a portal, a deadline, a word limit. By then, the most important decisions have already been made — which subjects were taken seriously, which projects were pursued, which questions a student chose to follow." },
      { type: "quote", text: "Global opportunities are not won through applications alone. They are earned through the right mentorship." },
      { type: "h", text: "Applications describe a life; they cannot invent one" },
      { type: "p", text: "Leading universities and fellowship panels read for evidence: sustained curiosity, real responsibility, and growth over time. An application can only present what already exists. That is why Brillianton starts years earlier, with students in Grades 8–12 and with undergraduates long before fellowship cycles open." },
      { type: "h", text: "What early mentorship changes" },
      { type: "list", items: [
        "Students choose activities for depth and meaning, not for a checklist.",
        "Research and leadership have time to mature into something genuine.",
        "Families plan finances, timelines and options without last-minute pressure.",
        "When the application arrives, the story is already true — it only needs telling.",
      ] },
      { type: "p", text: "This is the difference between a consultancy and a mentorship organisation. One helps you submit. The other helps you become the candidate worth admitting." },
    ],
  },
  {
    slug: "five-fellowships-to-know",
    title: "Five international fellowships every ambitious graduate should know",
    category: "Scholarship Updates",
    excerpt: "Fulbright, Chevening, DAAD, Erasmus Mundus and Commonwealth — what each is for, and how to start preparing for them.",
    readTime: "6 min read",
    image: photos.columns,
    body: [
      { type: "p", text: "These five programmes are among the most respected routes to fully funded study abroad. Each has its own purpose and its own idea of an ideal candidate. Always confirm eligibility, deadlines and funding on the official website before planning." },
      { type: "h", text: "Fulbright-Nehru Fellowships — United States" },
      { type: "p", text: "Administered in India by the United States-India Educational Foundation (USIEF), Fulbright-Nehru fellowships support master's study, doctoral research, teaching and professional development in the US." },
      { type: "h", text: "Chevening Scholarships — United Kingdom" },
      { type: "p", text: "The UK government's global scholarship programme funds one-year master's degrees for people with leadership potential. Panels look closely at leadership, networking and a clear plan for your career after the degree." },
      { type: "h", text: "DAAD — Germany" },
      { type: "p", text: "The German Academic Exchange Service offers a wide range of funding for master's study, doctoral research and research stays in Germany, across disciplines." },
      { type: "h", text: "Erasmus Mundus Joint Masters — Europe" },
      { type: "p", text: "Delivered by consortia of universities, these integrated master's programmes take students through at least two European countries. Scholarships are awarded by each programme, so applications are made programme by programme." },
      { type: "h", text: "Commonwealth Scholarships — United Kingdom" },
      { type: "p", text: "Funded by the UK government, these support master's and PhD study for candidates from Commonwealth countries, with an emphasis on development impact." },
      { type: "h", text: "Where to begin" },
      { type: "list", items: [
        "Shortlist by purpose and field, not by prestige alone.",
        "Map eligibility a full cycle ahead — work experience requirements catch many applicants out.",
        "Start your narrative early: why this programme, why now, and what you will do after.",
        "Speak with alumni. Future Fellows is mentored by people who have been through these processes.",
      ] },
    ],
  },
  {
    slug: "leadership-school-finland-2026",
    title: "Leadership School Finland 2026 with JAMK University of Applied Sciences",
    category: "Fellowship Opportunities",
    excerpt: "Eight days in Finland, three courses and three European credits in AI, Entrepreneurship and Business Communication.",
    readTime: "3 min read",
    image: photos.glassLibrary,
    body: [
      { type: "p", text: "Leadership School Finland 2026 is a short international programme with JAMK University of Applied Sciences, shared with Brillianton's undergraduate community as an opportunity for early global exposure." },
      { type: "h", text: "At a glance" },
      { type: "list", items: [
        "Host: JAMK University of Applied Sciences, Finland",
        "Duration: 8 days",
        "Courses: 3 — AI, Entrepreneurship and Business Communication",
        "Credits: 3 European credits",
        "Locations: Jyväskylä, Helsinki and Porvoo",
        "Eligibility: undergraduate students",
      ] },
      { type: "h", text: "Why short programmes matter" },
      { type: "p", text: "A short programme abroad will not replace a degree, but it can change how a student sees their future: international classrooms, new ways of working, and a first-hand sense of what studying abroad really asks of you. It also gives depth to future fellowship and master's applications." },
      { type: "p", text: "For eligibility, dates and how to apply, connect with the Brillianton team." },
    ],
  },
  {
    slug: "what-leading-universities-look-for",
    title: "What leading universities look for in a school student",
    category: "University Spotlight",
    excerpt: "Grades open the door. Curiosity, initiative and character decide who walks through it.",
    readTime: "5 min read",
    image: photos.gothicQuad,
    body: [
      { type: "p", text: "Admissions to Oxford, Cambridge, the Ivy League and other QS Top 100 universities differ in format — interviews, admissions tests, essays, predicted grades — but they share a common question: will this student thrive here and contribute?" },
      { type: "h", text: "Academic rigour, first" },
      { type: "p", text: "Strong grades in demanding subjects remain the foundation. For the UK, depth in your chosen subject matters most; for the US, breadth and intellectual range carry more weight." },
      { type: "h", text: "Intellectual curiosity you can show" },
      { type: "p", text: "Reading beyond the syllabus, independent projects, research exposure and competitions are evidence that a student thinks for themselves. Quality matters far more than quantity." },
      { type: "h", text: "Initiative and impact" },
      { type: "p", text: "Leadership is not a title. It is a problem you noticed and did something about, sustained over time." },
      { type: "h", text: "A coherent story" },
      { type: "p", text: "The best applications feel inevitable: the subjects, activities and essays all point in the same direction. That coherence is built over years, which is why Mission QS100 begins as early as Grade 8." },
    ],
  },
  {
    slug: "writing-a-statement-of-purpose",
    title: "Writing a Statement of Purpose that sounds like you",
    category: "Application Advice",
    excerpt: "Panels read thousands of statements. The ones they remember are specific, honest and forward-looking.",
    readTime: "5 min read",
    image: photos.openBook,
    body: [
      { type: "p", text: "A Statement of Purpose is not a CV in paragraphs. It is an argument: that you, specifically, should be given this opportunity, and that you will use it well." },
      { type: "h", text: "Start with a question, not a quotation" },
      { type: "p", text: "Open with the problem or question that genuinely drives you. Specific moments are far more convincing than general passion." },
      { type: "h", text: "Show the path" },
      { type: "list", items: [
        "What have you already done about this question?",
        "What did you learn — including from what went wrong?",
        "Why is this programme, at this institution, the right next step?",
        "What will you do afterwards, and for whom?",
      ] },
      { type: "h", text: "Edit for clarity" },
      { type: "p", text: "Cut adjectives, keep evidence. Read it aloud. Ask a mentor who knows the programme to read it as a panel would. Then edit again." },
      { type: "quote", text: "If someone else could have written your statement, it is not finished yet." },
    ],
  },
  {
    slug: "achievers-dialogue-oxford-manchester-chevening",
    title: "Achievers' Dialogue: the path to Oxford, Manchester and Chevening",
    category: "Scholarship Updates",
    excerpt: "Chevening Scholars Maknoon Wani and Amiya Sur on securing prestigious scholarships and admission to top UK universities. Recordings available.",
    readTime: "Webinar recap",
    image: photos.redBrick,
    body: [
      { type: "p", text: "Brillianton's Achievers' Dialogue series brings mentees face to face with people who have already walked the path. Session 2, held on 24 January 2026, featured two Chevening Scholars." },
      { type: "list", items: [
        "Maknoon Wani — Chevening Scholar (2023–24), University of Oxford",
        "Amiya Sur — Chevening Scholar (2022–23), University of Manchester",
      ] },
      { type: "p", text: "Both speakers shared their journeys and practical insight on scholarship applications and admission to leading UK universities. The full recordings are available on the Insights page under Webinars." },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
