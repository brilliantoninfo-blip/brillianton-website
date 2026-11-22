"use client";

import Script from "next/script";

/** Live Instagram feed via the existing Elfsight widget (same app id as the previous site). */
export default function InstagramFeed() {
  return (
    <div className="min-h-[200px] overflow-hidden rounded-[28px] bg-white p-4 ring-1 ring-ink/5">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className="elfsight-app-083d3f42-a92a-4cbe-96f6-489ebff5f980" data-elfsight-app-lazy />
    </div>
  );
}
