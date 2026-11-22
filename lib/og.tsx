import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Branded 1200×630 share card used by every route's opengraph-image. */
export function renderOg({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 78% 30%, #2e5bff 0%, #1240e0 38%, #0a30c4 70%, #06229a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="84" height="71" viewBox="0 0 140 118">
            <path d="M38 9 70 0l32 9-32 9z" fill="#FFD43B" />
            <path d="M0 118V62C0 50 7 43 18 42l8-1v77z" fill="#fff" />
            <path d="M33 118V37c3-8 14-13 30-15v96z" fill="#fff" />
            <path d="M77 118V22c16 2 27 7 30 15v81z" fill="#fff" />
            <path d="M114 118V41l8 1c11 1 18 8 18 20v56z" fill="#fff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>BRILLIANTON</div>
            <div style={{ fontSize: 15, letterSpacing: 9, opacity: 0.85 }}>GLOBAL EDUCATION</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#FFD43B", textTransform: "uppercase", marginBottom: 22 }}>{eyebrow}</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: title.length > 38 ? 66 : 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          {accent && <div style={{ display: "flex", fontSize: 44, marginTop: 14, color: "#FFD43B", fontStyle: "italic" }}>{accent}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, opacity: 0.9 }}>
          <div style={{ display: "flex" }}>International academic mentorship · Calicut, India</div>
          <div style={{ display: "flex", background: "#FFD43B", color: "#0B1236", padding: "10px 22px", borderRadius: 999, fontWeight: 700 }}>brilliantonedu.com</div>
        </div>
      </div>
    ),
    ogSize
  );
}
