import Link from "next/link";
import { nav, programmes, site } from "@/lib/site";
import { guides } from "@/lib/guides";
import { Mark } from "@/components/ui/primitives";
import { Logo } from "@/components/Header";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="frame relative pb-10 pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-white/70">
              An international academic mentorship organisation. <span className="italic-serif text-white">Global vision, personal guidance.</span>
            </p>
            <address className="mt-8 not-italic leading-relaxed text-white/60">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.region}, {site.address.country}
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow text-white/40">Navigate</h2>
              <ul className="mt-6 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-white/80 transition hover:text-sun">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-white/40">Programmes</h2>
              <ul className="mt-6 space-y-3">
                {programmes.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/programmes#${p.slug}`} className="text-white/80 transition hover:text-sun">
                      {p.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/programmes#institutions" className="text-white/80 transition hover:text-sun">
                    For Institutions
                  </Link>
                </li>
                <li>
                  <Link href="/pathway-finder" className="text-white/80 transition hover:text-sun">
                    Pathway finder
                  </Link>
                </li>
                <li>
                  <Link href="/insights#sessions" className="text-white/80 transition hover:text-sun">
                    Sessions
                  </Link>
                </li>
                <li>
                  <Link href="/insights#webinars" className="text-white/80 transition hover:text-sun">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow text-white/40">Connect</h2>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href={`mailto:${site.email}`} className="break-all text-white/80 transition hover:text-sun">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phoneHref} className="text-white/80 transition hover:text-sun">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/80 transition hover:text-sun">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 transition hover:text-sun">
                    Instagram {site.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav aria-label="Guides" className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm">
          <span className="eyebrow text-white/40">Guides</span>
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="text-white/75 transition hover:text-sun">
              {g.metaTitle.split(" | ")[0].split(":")[0]}
            </Link>
          ))}
        </nav>

        <div aria-hidden className="mt-24">
          <Mark className="mb-6 h-10 w-auto text-royal sm:h-14" capClassName="text-sun" />
          <p className="display-wide select-none whitespace-nowrap text-[10.2vw] font-extrabold leading-[0.8] tracking-[-0.05em] text-white min-[1440px]:text-[9.4rem]">BRILLIANTON</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {year} Brillianton Global Education. All rights reserved.</p>
          <p>Mentorship-led. Never a guarantee of admission or funding.</p>
        </div>
      </div>
    </footer>
  );
}
