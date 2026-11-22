"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, ease } from "@/components/ui/primitives";
import { whatsappLink } from "@/components/MobileActionBar";
import { decide, type Answers } from "@/lib/pathway";

type Option = { id: string; label: string };
type Question = { id: "who" | "stage" | "goal" | "region" | "timing"; title: (a: Answers) => string; options: Option[] };


const questions: Question[] = [
  {
    id: "who",
    title: () => "Who is exploring?",
    options: [
      { id: "student", label: "I'm a student" },
      { id: "parent", label: "I'm a parent" },
      { id: "institution", label: "I represent a school or college" },
    ],
  },
  {
    id: "stage",
    title: (a) => (a.who === "parent" ? "What stage is your child at?" : "What stage are you at?"),
    options: [
      { id: "g8-10", label: "Grade 8–10" },
      { id: "g11-12", label: "Grade 11–12" },
      { id: "ug", label: "Undergraduate" },
      { id: "pg", label: "Postgraduate or working professional" },
    ],
  },
  {
    id: "goal",
    title: () => "What's the big goal?",
    options: [
      { id: "top-uni", label: "Admission to a leading global university" },
      { id: "fellowship", label: "A fully funded Master's or fellowship" },
      { id: "exposure", label: "Short global exposure — a summer school or immersion" },
      { id: "unsure", label: "Not sure yet — still exploring" },
    ],
  },
  {
    id: "region",
    title: () => "Where are you drawn to?",
    options: [
      { id: "usa", label: "United States" },
      { id: "uk", label: "United Kingdom" },
      { id: "europe", label: "Europe" },
      { id: "any", label: "Anywhere — the best fit" },
    ],
  },
  {
    id: "timing",
    title: () => "When do you want to start preparing?",
    options: [
      { id: "now", label: "Right now" },
      { id: "6m", label: "In the next six months" },
      { id: "exploring", label: "Just exploring for now" },
    ],
  },
];

/** Five quick questions → a recommended Brillianton pathway, with next steps. Nothing is stored. */
export default function PathwayFinder({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const dark = tone === "dark";

  // Institutions only need the first question
  const flow = useMemo(() => (answers.who === "institution" ? questions.slice(0, 1) : questions), [answers.who]);
  const done = step >= flow.length;
  const q = flow[Math.min(step, flow.length - 1)];
  const result = done ? decide(answers) : null;

  const choose = (opt: Option) => {
    setAnswers((a) => ({ ...a, [q.id]: opt.id }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const summary = () => {
    const lines = flow.map((qq) => `${qq.title(answers)} ${qq.options.find((o) => o.id === answers[qq.id])?.label ?? ""}`);
    return `Hello Brillianton, I took the pathway finder on your website.\n\n${lines.join("\n")}\n\nRecommended: ${result?.programme}. I'd like a free consultation.`;
  };

  const card = dark ? "bg-white/[0.06] ring-1 ring-white/15 text-white" : "bg-white ring-1 ring-ink/5 text-ink shadow-[0_30px_80px_-40px_rgba(11,18,54,0.35)]";
  const muted = dark ? "text-white/65" : "text-ink/60";

  return (
    <div className={`relative overflow-hidden rounded-[32px] p-6 sm:p-10 ${card}`}>
      {/* progress */}
      <div className="flex items-center justify-between gap-4">
        <p className={`eyebrow ${dark ? "text-sun" : "text-royal"}`}>{done ? "Your pathway" : `Question ${step + 1} of ${flow.length}`}</p>
        {(step > 0 || done) && (
          <button type="button" onClick={done ? restart : () => setStep((s) => s - 1)} className={`min-h-[44px] text-sm font-semibold underline-offset-4 hover:underline ${muted}`}>
            {done ? "Start again" : "Back"}
          </button>
        )}
      </div>
      <div className={`mt-4 h-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-ink/10"}`} aria-hidden>
        <motion.div className="h-full rounded-full bg-sun" animate={{ width: `${(Math.min(step, flow.length) / flow.length) * 100}%` }} transition={{ duration: 0.5, ease }} />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.fieldset key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease }} className="mt-8">
            <legend className="text-title font-semibold">{q.title(answers)}</legend>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {q.options.map((o, i) => {
                const picked = answers[q.id] === o.id;
                return (
                  <motion.button
                    key={o.id}
                    type="button"
                    onClick={() => choose(o)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: 0.05 * i }}
                    aria-pressed={picked}
                    className={`group flex min-h-[64px] items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium ring-1 transition-all duration-300 ${
                      picked
                        ? "bg-sun text-ink ring-sun"
                        : dark
                          ? "ring-white/20 hover:bg-white hover:text-ink"
                          : "ring-ink/15 hover:bg-ink hover:text-white"
                    }`}
                  >
                    {o.label}
                    <Arrow className="h-3.5 w-3.5 shrink-0 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.button>
                );
              })}
            </div>
          </motion.fieldset>
        ) : (
          result && (
            <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mt-8" aria-live="polite">
              <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${muted}`}>We recommend</p>
              <h3 className="display-wide mt-2 text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                <span className={dark ? "text-sun" : "text-royal"}>{result.programme}</span>
              </h3>
              <p className="mt-4 text-xl font-semibold">{result.headline}</p>
              <p className={`mt-3 max-w-2xl leading-relaxed ${muted}`}>{result.why}</p>

              <p className={`mt-8 text-xs font-semibold uppercase tracking-[0.18em] ${muted}`}>Explore first</p>
              <ul className="mt-3 space-y-2">
                {result.explore.map((e) => (
                  <li key={e.label}>
                    {e.external ? (
                      <a href={e.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline">
                        {e.label} <Arrow className="h-3 w-3" diagonal />
                      </a>
                    ) : (
                      <Link href={e.href} className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline">
                        {e.label} <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(summary())}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="pathway-whatsapp"
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-ink transition hover:brightness-95"
                >
                  Get a free consultation on WhatsApp
                </a>
                <Link
                  href={`/contact?interest=${encodeURIComponent(result.interest)}`}
                  data-cta="pathway-contact"
                  className={`inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 text-sm font-semibold ring-1 transition ${dark ? "ring-white/30 hover:bg-white hover:text-ink" : "ring-ink/20 hover:bg-ink hover:text-white"}`}
                >
                  Send an enquiry <Arrow className="h-3 w-3" />
                </Link>
                <Link href={result.href} className={`inline-flex min-h-[52px] items-center gap-2 px-2 text-sm font-semibold underline-offset-4 hover:underline ${muted}`}>
                  See the programme
                </Link>
              </div>
              <p className={`mt-6 text-xs ${muted}`}>Your answers stay in your browser. Recommendations are a starting point — the team will confirm fit in a conversation.</p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
