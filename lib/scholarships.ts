/**
 * Opportunity finder data. Seeded from Brillianton's own Instagram scholarship alerts and
 * programme material. Deadlines change every cycle, so cards always send people to the official source.
 */
export type Level = "School" | "Undergraduate" | "Postgraduate" | "PhD & Research";
export type Kind = "Scholarship" | "Fellowship" | "Internship" | "Summer programme" | "Competition" | "Pathway";

export type Scholarship = {
  name: string;
  country: string;
  levels: Level[];
  kind: Kind;
  funding?: "Fully funded" | "Free" | "Funded" | "Prize";
  summary: string;
  href: string;
  /** Street View position for the "Walk the campus" view */
  campus?: { lat: number; lng: number; label: string };
};

export const levels: Level[] = ["School", "Undergraduate", "Postgraduate", "PhD & Research"];
export const kinds: Kind[] = ["Scholarship", "Fellowship", "Internship", "Summer programme", "Competition", "Pathway"];

export const scholarships: Scholarship[] = [
  // Flagship pathways
  { name: "Fulbright-Nehru Fellowships", country: "USA", levels: ["Postgraduate", "PhD & Research"], kind: "Fellowship", funding: "Fully funded", summary: "The flagship India–US exchange for master's study, doctoral research, teaching and professional development, administered in India by USIEF.", href: "https://www.usief.org.in/" },
  { name: "Chevening Scholarships", country: "UK", levels: ["Postgraduate"], kind: "Scholarship", funding: "Fully funded", summary: "The UK government's global scholarship for one-year master's degrees, for people with demonstrated leadership potential.", href: "https://www.chevening.org/" },
  { name: "Commonwealth Scholarships", country: "UK", levels: ["Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "UK-funded master's and PhD scholarships for talented candidates from Commonwealth countries.", href: "https://cscuk.fcdo.gov.uk/" },
  { name: "DAAD Scholarships", country: "Germany", levels: ["Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "The German Academic Exchange Service funds master's study, doctoral research and research stays in Germany.", href: "https://www.daad.de/en/" },
  { name: "Erasmus Mundus Joint Masters", country: "Europe", levels: ["Postgraduate"], kind: "Scholarship", funding: "Fully funded", summary: "Integrated master's programmes taught across at least two European countries by university consortia.", href: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en" },
  { name: "Leadership School Finland 2026", country: "Finland", levels: ["Undergraduate"], kind: "Summer programme", summary: "Eight days with JAMK University of Applied Sciences: three courses and three European credits in AI, Entrepreneurship and Business Communication.", href: "/insights/leadership-school-finland-2026" },
  { name: "Oxford, Cambridge & Ivy League pathway", country: "UK & USA", levels: ["School"], kind: "Pathway", summary: "For Grades 8–12: the long road to leading universities, mentored through Mission QS100.", href: "/programmes#mission-qs100", campus: { lat: 51.7534, lng: -1.254, label: "Radcliffe Camera, University of Oxford" } },

  // From Brillianton's scholarship alerts
  { name: "Knight-Hennessy Scholars", country: "USA", levels: ["Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "Stanford University's flagship programme funding graduate study in any Stanford degree, with leadership development.", href: "https://knight-hennessy.stanford.edu/", campus: { lat: 37.4275, lng: -122.1697, label: "Stanford University" } },
  { name: "Stanford free online courses", country: "USA", levels: ["School", "Undergraduate", "Postgraduate"], kind: "Summer programme", funding: "Free", summary: "Self-paced Stanford courses you can take online for free, with no application needed.", href: "https://online.stanford.edu/free-courses" },
  { name: "Google Public Policy Fellowship", country: "USA", levels: ["Undergraduate", "Postgraduate"], kind: "Fellowship", funding: "Funded", summary: "Paid summer fellowships with organisations working on technology and internet policy.", href: "https://publicpolicy.google/" },
  { name: "UCL Global Scholarships", country: "UK", levels: ["Undergraduate", "Postgraduate"], kind: "Scholarship", funding: "Funded", summary: "University College London scholarships for international students from lower-income backgrounds, covering fees and living costs.", href: "https://www.ucl.ac.uk/scholarships", campus: { lat: 51.5246, lng: -0.134, label: "UCL, London" } },
  { name: "University of Bristol scholarships", country: "UK", levels: ["Undergraduate", "Postgraduate"], kind: "Scholarship", funding: "Funded", summary: "Scholarships for international students starting undergraduate or postgraduate study at Bristol.", href: "https://www.bristol.ac.uk/", campus: { lat: 51.4585, lng: -2.603, label: "University of Bristol" } },
  { name: "John Locke Global Essay Prize", country: "UK", levels: ["School", "Undergraduate"], kind: "Competition", funding: "Prize", summary: "An international essay competition in philosophy, politics, economics, history and more, widely respected by top universities.", href: "https://www.johnlockeinstitute.com/essay-competition" },
  { name: "Immerse Education Essay Competition", country: "UK", levels: ["School"], kind: "Competition", funding: "Prize", summary: "An essay competition for school students, with scholarships to Immerse academic summer schools as prizes.", href: "https://www.immerse.education/" },
  { name: "Rotary Peace Fellowship", country: "Global", levels: ["Postgraduate"], kind: "Fellowship", funding: "Fully funded", summary: "Fully funded master's degrees and certificate programmes in peace and development at Rotary Peace Centers worldwide.", href: "https://www.rotary.org/en/our-programs/peace-fellowships" },
  { name: "Government of Ireland International Education Scholarships", country: "Ireland", levels: ["Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Funded", summary: "Irish government scholarships with a stipend and full fee waiver for master's and PhD study in Ireland.", href: "https://hea.ie/policy/internationalisation/goi-ies/" },
  { name: "Einstein Forum Fellowship", country: "Germany", levels: ["PhD & Research"], kind: "Fellowship", funding: "Funded", summary: "A residential fellowship for early-career researchers at Einstein's summer house in Caputh, near Potsdam.", href: "https://www.einsteinforum.de/" },
  { name: "UGA IDEX Excellence Scholarship", country: "France", levels: ["Postgraduate"], kind: "Scholarship", funding: "Funded", summary: "Merit scholarships for international master's students at Université Grenoble Alpes.", href: "https://www.univ-grenoble-alpes.fr/", campus: { lat: 45.191, lng: 5.768, label: "Université Grenoble Alpes" } },
  { name: "EEML Summer School", country: "Europe", levels: ["Undergraduate", "Postgraduate", "PhD & Research"], kind: "Summer programme", summary: "The Eastern European Machine Learning summer school: lectures and practicals with leading AI researchers.", href: "https://www.eeml.eu/" },
  { name: "WIPO Internship Programme", country: "Switzerland", levels: ["Postgraduate"], kind: "Internship", funding: "Funded", summary: "Internships at the World Intellectual Property Organization in Geneva.", href: "https://www.wipo.int/jobs/en/internships/" },
  { name: "Youth4Climate", country: "Global", levels: ["Undergraduate", "Postgraduate"], kind: "Fellowship", funding: "Funded", summary: "UNDP and the Government of Italy fund youth-led climate solutions and projects.", href: "https://youth4climate.info/" },
  { name: "UNEP Young Champions of the Earth", country: "Global", levels: ["Undergraduate", "Postgraduate"], kind: "Competition", funding: "Prize", summary: "The UN Environment Programme's prize for young people aged 18–30 with bold environmental ideas.", href: "https://www.unep.org/youngchampions" },
  { name: "MEXT Scholarship", country: "Japan", levels: ["Undergraduate", "Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "The Japanese government's scholarship for undergraduate, master's and research study at Japanese universities.", href: "https://www.studyinjapan.go.jp/en/" },
  { name: "RIKEN Summer Internship", country: "Japan", levels: ["Undergraduate", "Postgraduate"], kind: "Internship", funding: "Funded", summary: "Research internships at RIKEN, Japan's largest research institute.", href: "https://www.riken.jp/en/", campus: { lat: 35.7826, lng: 139.6119, label: "RIKEN Wako campus" } },
  { name: "NUS Goh Keng Swee Scholarship", country: "Singapore", levels: ["Undergraduate"], kind: "Scholarship", funding: "Funded", summary: "Undergraduate scholarship at the National University of Singapore covering tuition and living support.", href: "https://www.nus.edu.sg/oam/", campus: { lat: 1.2966, lng: 103.7764, label: "National University of Singapore" } },
  { name: "HKU Summer Research Programme", country: "Hong Kong", levels: ["Undergraduate"], kind: "Summer programme", funding: "Funded", summary: "A summer research programme for undergraduates at the University of Hong Kong.", href: "https://www.hku.hk/", campus: { lat: 22.283, lng: 114.1371, label: "University of Hong Kong" } },
  { name: "Chinese Government Scholarship", country: "China", levels: ["Undergraduate", "Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "Scholarships for international students at Chinese universities, covering tuition, accommodation and a stipend.", href: "https://www.campuschina.org/", campus: { lat: 30.539, lng: 114.36, label: "Wuhan University" } },
  { name: "Türkiye Scholarships", country: "Türkiye", levels: ["Undergraduate", "Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "Government scholarships for study at Turkish universities, including tuition, accommodation and a monthly stipend.", href: "https://www.turkiyeburslari.gov.tr/" },
  { name: "KAUST Visiting Student Research Programme", country: "Saudi Arabia", levels: ["Undergraduate", "Postgraduate"], kind: "Internship", funding: "Funded", summary: "Research internships at King Abdullah University of Science and Technology.", href: "https://vsrp.kaust.edu.sa/", campus: { lat: 22.3095, lng: 39.1047, label: "KAUST" } },
  { name: "MBZUAI Undergraduate Research Internship", country: "UAE", levels: ["Undergraduate"], kind: "Internship", funding: "Funded", summary: "Funded AI research internships for undergraduates at Mohamed bin Zayed University of Artificial Intelligence, Abu Dhabi.", href: "https://mbzuai.ac.ae/ugrip/" },
  { name: "Brunei Darussalam Government Scholarship", country: "Brunei", levels: ["Undergraduate", "Postgraduate"], kind: "Scholarship", funding: "Fully funded", summary: "Brunei government scholarships for foreign students, covering tuition, accommodation and allowances.", href: "https://www.mfa.gov.bn/" },
  { name: "KNB Scholarship", country: "Indonesia", levels: ["Undergraduate", "Postgraduate", "PhD & Research"], kind: "Scholarship", funding: "Fully funded", summary: "The Indonesian government's scholarship for international students at Indonesian universities.", href: "https://knb.kemdikbud.go.id/" },
  { name: "Ashoka Young India Fellowship", country: "India", levels: ["Postgraduate"], kind: "Fellowship", summary: "A one-year residential liberal studies programme at Ashoka University for young graduates.", href: "https://www.ashoka.edu.in/" },
];

export const countries = Array.from(new Set(scholarships.map((s) => s.country))).sort();
