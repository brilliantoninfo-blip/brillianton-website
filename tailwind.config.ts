import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal & Sunlight — refined from the Brillianton brochure
        ink: "#0B1236", // deep navy: text + dark chapters
        navy: "#14206B",
        royal: "#1D3FE0", // brand royal blue (UI, links, buttons)
        deep: "#0A30C4", // brochure field blue — matches the deck illustrations
        azure: "#5B7CFF",
        sky: "#AFC3FF",
        sun: "#FFD43B", // brilliant yellow accent
        paper: "#FAF8F3", // warm ivory
        sand: "#F1EDE3",
        mist: "#DCE3FA",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        mega: ["clamp(2.75rem, 8.1vw, 9.4rem)", { lineHeight: "0.9", letterSpacing: "-0.045em" }],
        huge: ["clamp(2.8rem, 7.6vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        display: ["clamp(2.2rem, 5vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        title: ["clamp(1.6rem, 2.8vw, 2.6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      maxWidth: { frame: "1440px" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        breathe: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.015)" } },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        breathe: "breathe 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
