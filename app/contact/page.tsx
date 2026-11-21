import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import { Eyebrow } from "@/components/ui/primitives";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Brillianton Global Education — HiLite Business Park, Calicut, Kerala. Call or WhatsApp +91 97781 17553.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "WhatsApp", value: site.phone, href: site.whatsapp, external: true },
  { label: "Call", value: site.phone, href: site.phoneHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Instagram", value: site.instagramHandle, href: site.instagram, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about"
        accent="your next step."
        intro="Whether you're a student, a parent or an institution, tell us where you want to go. The Brillianton team will help you find the right pathway."
      />
      <section className="bg-paper py-20 sm:py-28">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Eyebrow className="text-royal">Reach us directly</Eyebrow>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-ink/50">{c.label}</span>
                      <span className="mt-1 block break-all text-lg font-medium text-ink transition-colors group-hover:text-royal">{c.value}</span>
                    </span>
                    <span aria-hidden className="text-royal transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[28px] bg-ink p-8 text-white">
              <p className="eyebrow text-sun">Headquarters</p>
              <address className="mt-4 text-xl not-italic leading-relaxed">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.region}
                <br />
                {site.address.country}
              </address>
              <a
                href="https://www.google.com/maps/search/?api=1&query=HiLite+Business+Park+Calicut"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-sun hover:text-white"
              >
                Open in Maps ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
