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
        lightHover: 'var(--site-accent-soft)',
        darkHover: 'var(--site-surface-muted)',
        darkTheme: 'var(--site-bg)',
        brand:   'var(--site-accent)',
        bgLight: 'var(--site-bg)',
        textMain:'var(--site-text)',
      },
      fontFamily: {
        PlusJakarta: ["var(--font-navbar)", "sans-serif"],
        StixTwoText: ["var(--font-source-sans)", "sans-serif"],
        Hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px,1fr))'
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
} satisfies Config;
