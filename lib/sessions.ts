/**
 * Every session image from @brilliantonglobal (posters and clips from live sessions),
 * collected from the public Instagram feed. Each links back to its post.
 * Titles are taken from what each poster itself shows.
 */
export type SessionSeries = "Global Fellowship Orientation" | "Global Futures" | "Achievers' Dialogue" | "Guest Sessions";

export type SessionItem = {
  code: string; // Instagram shortcode → /sessions/<code>.jpg
  series: SessionSeries;
  title: string;
  detail?: string;
  kind: "Poster" | "From the session";
  w: number;
  h: number;
};

export const seriesInfo: Record<SessionSeries, string> = {
  "Global Fellowship Orientation": "100 Dreams. 100 Fellowships. — an online workshop series on fully funded Master's fellowships, with partner colleges.",
  "Global Futures": "Pathway to Premium Universities — on-campus sessions for school students, led by global scholars.",
  "Achievers' Dialogue": "Free webinars with scholars who made it — Oxford, Manchester, Harvard, Chevening and Erasmus Mundus.",
  "Guest Sessions": "Brillianton mentors speaking at partner institutions and events.",
};

const P = "Poster" as const;
const S = "From the session" as const;

export const sessions: SessionItem[] = [
  // Global Fellowship Orientation workshops
  { code: "DfFMfqpiLKu", series: "Global Fellowship Orientation", title: "Session 5 — Fulbright Fellowships", detail: "Fully funded opportunities in the United States · 31 October 2026 · Online", kind: P, w: 1080, h: 1346 },
  { code: "DezWJEEiiEZ", series: "Global Fellowship Orientation", title: "Session 4 — DAAD Scholarships", detail: "Your gateway to a fully funded Master's in Germany, with DAAD Scholar V V Arfitha · 24 October 2026 · Online", kind: P, w: 1074, h: 1350 },
  { code: "DeEHmR8C3uO", series: "Global Fellowship Orientation", title: "Session 3 — Erasmus Mundus", detail: "Fully funded gateway to Europe, with Erasmus Mundus Scholar Farseen Ali · 10 October 2026 · Online", kind: P, w: 1080, h: 1350 },
  { code: "DdXvBpoC9fe", series: "Global Fellowship Orientation", title: "Session 2 — Commonwealth Scholarship", detail: "A fully funded Master's in the UK, with Commonwealth Scholar Saba Ameer · 21 September 2026 · Online", kind: P, w: 1078, h: 1350 },
  { code: "Dc5QCGgCy0M", series: "Global Fellowship Orientation", title: "Inaugural session — Chevening Scholarship", detail: "The road to the UK's premier universities", kind: P, w: 1080, h: 1350 },
  { code: "DdjHwmViDYN", series: "Global Fellowship Orientation", title: "Inaugural session talk clip", detail: "With thanks to Najeeb Kanthapuram MLA", kind: S, w: 360, h: 640 },

  // Global Futures — Pathway to Premium Universities
  { code: "DbDdwj2iZGu", series: "Global Futures", title: "Global Futures at Shaziya International", detail: "Pathway to Premium Universities", kind: P, w: 1080, h: 1350 },
  { code: "DZ-P38WBFNq", series: "Global Futures", title: "Global Futures at The Global Public School", detail: "Exploring pathways to the world's leading universities", kind: P, w: 1080, h: 1350 },
  { code: "DZ9Rhd_R0SA", series: "Global Futures", title: "Global Futures — talk by Dr. M Sihabudheen", detail: "The Global Public School · 27 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZ9RZ2dRsVY", series: "Global Futures", title: "Global Futures — faculty line-up", detail: "The Global Public School · 27 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZ9RMmmR0Z_", series: "Global Futures", title: "Global Futures — talk by Mohammed Nizar", detail: "The Global Public School · 27 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZMxmvsCSvU", series: "Global Futures", title: "Global Futures at Escola International", detail: "Led by Dr. Ilyas M, Fulbright Scholar · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZMxX0fCVIU", series: "Global Futures", title: "Global Futures at Escola International", detail: "Led by Farseen Ali, Erasmus Mundus Scholar · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZMw3EoC0qj", series: "Global Futures", title: "Global Futures at Escola International", detail: "Led by Dr. M Sihabudheen, Fulbright Scholar · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZK69dFi2SY", series: "Global Futures", title: "Global Futures 2026 at Escola International", detail: "Pathway to Premium Universities · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZCanBUisgh", series: "Global Futures", title: "Global Futures at Escola International", detail: "Pathway to Premium Universities · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZCZ-mbCZTH", series: "Global Futures", title: "Global Futures at Escola International", detail: "Led by Farseen Ali · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DZCXoU-MAfT", series: "Global Futures", title: "Global Futures at Escola International", detail: "Led by Dr. M Sihabudheen · 6 June 2026", kind: P, w: 1080, h: 1350 },
  { code: "DY1E3HTEX2H", series: "Global Futures", title: "Global Futures — learn directly from global scholars", detail: "Pathway to Premium Universities", kind: P, w: 1080, h: 1350 },
  { code: "DaPTfhFMU1t", series: "Global Futures", title: "Global Futures at The Global Public School", detail: "Students exploring pathways to world-class universities", kind: S, w: 360, h: 640 },
  { code: "DaK2rsRhurM", series: "Global Futures", title: "Global Futures on campus", kind: S, w: 360, h: 639 },
  { code: "DaCYZ2dRtOU", series: "Global Futures", title: "A full hall for career guidance", kind: S, w: 360, h: 639 },
  { code: "DZXMYsOi77G", series: "Global Futures", title: "Learning directly from global scholars", kind: S, w: 360, h: 640 },
  { code: "DZScSekiygD", series: "Global Futures", title: "Exploring universities, scholarships and fellowships together", kind: S, w: 360, h: 640 },
  { code: "DZPg1ftC52O", series: "Global Futures", title: "Students meet those who walked the path", kind: S, w: 360, h: 640 },
  { code: "DaX6cmKCkWv", series: "Global Futures", title: "An engaging, interactive session", kind: S, w: 360, h: 639 },

  // Achievers' Dialogue webinars
  { code: "DTU-MqjkQdS", series: "Achievers' Dialogue", title: "Session 2 — Oxford, Manchester & Chevening", detail: "Maknoon Wani and Amiya Sur · 24 January 2026", kind: P, w: 1080, h: 1097 },
  { code: "DTXC3DXEScA", series: "Achievers' Dialogue", title: "Free webinar — your path to Oxford, Manchester & Chevening", detail: "24 January 2026 · Online", kind: P, w: 1022, h: 1350 },
  { code: "DTkAx1LkT6B", series: "Achievers' Dialogue", title: "Session 2 — inside the journey to Oxford and Manchester", kind: P, w: 1067, h: 1350 },
  { code: "DTuCaY0kTef", series: "Achievers' Dialogue", title: "Unlock your Oxford & Manchester dream", detail: "Insider secrets on applications and Chevening", kind: P, w: 1012, h: 1350 },
  { code: "DSndb3JE9ix", series: "Achievers' Dialogue", title: "Session 1 — meet those who made it happen", detail: "Rajaneesh Rajan, Eknath Wagh and Farseen Ali P · 27 December 2025", kind: P, w: 1080, h: 1350 },

  // Guest sessions
  { code: "De_7oJCzwym", series: "Guest Sessions", title: "Career Futura at CIGI, Kozhikode", detail: "Scholarships Beyond Borders, by Dr. M Sihabudheen · 31 October 2026", kind: P, w: 1080, h: 1350 },
  { code: "DeftJnECDF6", series: "Guest Sessions", title: "Pathway to Top Global Universities", detail: "Orientation with Aizer Academy, by Dr. M Sihabudheen · 17 October 2026", kind: P, w: 1080, h: 1334 },
  { code: "DbdLXh9iHrU", series: "Guest Sessions", title: "A session with Dr. Mohamed Haseeb N", detail: "Fulbright Post-Doctoral Fellow, UCLA", kind: S, w: 360, h: 640 },
  { code: "DbYB-NviNO2", series: "Guest Sessions", title: "A session with Naseef Parasseri", detail: "PhD Research Scholar, Stanford University", kind: S, w: 360, h: 640 },
];

export const sessionSrc = (s: SessionItem) => `/sessions/${s.code}.jpg`;
export const sessionHref = (s: SessionItem) => `https://www.instagram.com/p/${s.code}/`;
