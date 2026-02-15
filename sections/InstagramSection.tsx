"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const INSTAGRAM_POSTS = [
  "https://www.instagram.com/reel/DUp4bleE6i1/",
  "https://www.instagram.com/p/DUcnShcEUe0/",
  "https://www.instagram.com/p/DUZ4_eAkXml/",
  "https://www.instagram.com/p/DUPgiRRkTBz/",
  "https://www.instagram.com/p/DUNIZeSkW8Q/",
  "https://www.instagram.com/p/DUKbaH6EYDt/",
  "https://www.instagram.com/p/DUHzm7JESFS/",
];

function toEmbedUrl(postUrl: string): string {
  const clean = postUrl.replace(/\/?(\?.*)?$/, "");
  return `${clean}/embed/`;
}

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
            {INSTAGRAM_POSTS.map((url) => (
              <div
                key={url}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="w-full min-w-[326px] max-w-[540px] rounded-lg overflow-hidden shadow-md bg-white">
                  <iframe
                    src={toEmbedUrl(url)}
                    title={`Instagram post ${url}`}
                    className="w-full border-0"
                    style={{ height: 630 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 hover:bg-white hover:text-primary rounded-lg border border-gray-200 shadow-sm transition-colors"
                >
                  View on Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
