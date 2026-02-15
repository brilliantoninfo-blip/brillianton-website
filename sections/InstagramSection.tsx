"use client";

import { motion } from "framer-motion";
import Script from "next/script";

const INSTAGRAM_EMBED_URLS = [
  "https://www.instagram.com/reel/DUp4bleE6i1/",
  "https://www.instagram.com/p/DUcnShcEUe0/",
  "https://www.instagram.com/p/DUZ4_eAkXml/",
  "https://www.instagram.com/p/DUPgiRRkTBz/",
  "https://www.instagram.com/p/DUNIZeSkW8Q/",
  "https://www.instagram.com/p/DUKbaH6EYDt/",
  "https://www.instagram.com/p/DUHzm7JESFS/",
];

export default function InstagramSection() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with our latest updates, success stories, and educational insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
            aria-label="Instagram posts grid"
          >
            {INSTAGRAM_EMBED_URLS.map((url) => (
              <div
                key={url}
                className="w-full min-w-0 max-w-[540px] flex justify-center [&_.instagram-media]:min-w-[326px] [&_.instagram-media]:max-w-[540px] [&_.instagram-media]:!w-full"
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    View this post on Instagram
                  </a>
                </blockquote>
              </div>
            ))}
          </div>

          <Script
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
            onLoad={() => {
              const win = window as Window & { instgrm?: { Embeds: { process(): void } } };
              if (typeof win.instgrm !== "undefined") {
                win.instgrm.Embeds.process();
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
