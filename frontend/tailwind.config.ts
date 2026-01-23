import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        iteka: {
          orange: '#FFA500',
          pink: '#FF1493',
          yellow: '#FFFF00',
          cyan: '#00BFFF',
          green: '#7CFC00',
          brown: '#8B4513',
          gray: '#808080',
          dark: '#1A1A1A',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;