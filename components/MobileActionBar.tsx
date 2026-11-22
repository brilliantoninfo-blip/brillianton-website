"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { ease } from "@/components/ui/primitives";

export const whatsappLink = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

function WhatsAppGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/**
 * Phone-only action bar: one-tap WhatsApp and call. Appears once the visitor
 * scrolls past the opening screen and steps aside when the footer is in view.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.querySelector("footer");
    const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { rootMargin: "0px 0px -40px 0px" }) : null;
    if (footer && io) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  const show = scrolled && !footerVisible;
  const message = "Hello Brillianton, I'd like a free consultation about your mentorship programmes.";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/10 bg-ink/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-2 pr-[64px]">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="sticky-whatsapp"
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-ink"
            >
              <WhatsAppGlyph /> Free consultation
            </a>
            <a
              href={site.phoneHref}
              data-cta="sticky-call"
              className="flex min-h-[48px] items-center justify-center rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/30"
            >
              Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
