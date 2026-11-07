/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "var(--mk-navy-950)", DEFAULT: "var(--mk-navy)", 800: "var(--mk-navy-800)", 700: "var(--mk-navy-700)" },
        blue: { DEFAULT: "var(--mk-blue)", 400: "var(--mk-blue-400)", 100: "var(--mk-blue-100)" },
        lime: { DEFAULT: "var(--mk-lime)", 600: "var(--mk-lime-600)" },
        paper: "var(--mk-paper)",
        ink: "var(--mk-ink)",
        muted: "var(--mk-muted)",
        line: "var(--mk-line)",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Arial Narrow", "sans-serif"],
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "84rem", prose: "40rem" },
      screens: { xs: "420px" },
    },
  },
  plugins: [],
};
