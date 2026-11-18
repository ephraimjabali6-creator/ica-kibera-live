/** @type {import('tailwindcss').Config} */
// ICA "Light Assembly" design system — crisp white canvas, clean structural lines, official ICA brand magenta.
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './content/**/*.{js,ts}', './lib/experience/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: { DEFAULT: '#111111', muted: '#27272A', faint: '#52525B' },
        paper: '#FFFFFF',
        mist: '#F8F9FA',
        line: '#E4E4E7',
        glass: 'rgba(255, 255, 255, 0.90)',
        plum: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F472B6',
          400: '#EC4899',
          500: '#E6007E', // official logo magenta
          600: '#D90077', // rich accessible magenta
          700: '#BE0064',
          800: '#9D0052',
          900: '#70003B',
        },
        brand: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F472B6',
          400: '#EC4899',
          500: '#E6007E',
          600: '#D90077',
          700: '#BE0064',
          800: '#9D0052',
          900: '#70003B',
        },
      },
      maxWidth: { site: '1440px' },
    },
  },
  plugins: [],
};
