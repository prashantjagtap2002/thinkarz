import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E31E24',
          redDark: '#C41A1F',
          navy: '#0F1B2E',
          navyLight: '#16233A',
          blue: '#2952CC',
          blueLight: '#EEF2FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
