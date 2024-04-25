/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sienna': {
          '50': '#fcf6f0',
          '100': '#f7ebdd',
          '200': '#eed3ba',
          '300': '#e4b58d',
          '400': '#d8905f',
          '500': '#d27c4c',
          '600': '#c15e35',
          '700': '#a0492e',
          '800': '#813d2b',
          '900': '#683426',
          '950': '#381812',
        },
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}
