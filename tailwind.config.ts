import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        panel: "var(--panel)",
        elevated: "var(--elevated)",
        border: "var(--border)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      boxShadow: {
        hairline: "inset 0 0 0 1px rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
