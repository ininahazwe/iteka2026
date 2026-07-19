// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        iteka: {
          orange: '#E87722',
          green: '#3F7A4F',
          dark: '#1A1A1A',
          pink: '#E91E63',
          cyan: '#00A3A3',
          yellow: '#FFC107',
          brown: '#795548',
          gray: '#808080',
          light: '#FFFFFF',
          // DA "Virtus-style" — tokens de mise en page
          cream: '#FDF8F2',
          ink: '#1F2937',
          muted: '#6B7280',
          band: '#FCE29B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;