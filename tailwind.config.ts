import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wave: "wave 20s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "25%": { transform: "translate(-6%, -6%) scale(1.3)" },
          "50%": { transform: "translate(12%, 12%) scale(1.2)" },
          "75%": { transform: "translate(-8%, -8%) scale(1.4)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
