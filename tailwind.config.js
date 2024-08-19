/** @type {import('tailwindcss').Config} */
import colors from './colos.config';
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: { ...colors },

      fontFamily: {},
      content: {},
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: '200px minmax(300px, 900px)',
        'sm-layout': '100px minmax(500px, 500px)',
        'md-layout': '100px minmax(500px, 500px)',
        'min-layout': '100px minmax(500px, 500px)',
        'content-layout': 'minmax(20px, 64px) repeat(9, 1fr)',
      },
    },
    screens: {
      mobile: '640px',
      // => @media (min-width: 640px) { ... }

      tablet: '760px',
      // => @media (min-width: 760px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        alice: {
          ...colors,
        },
      },
    ],
  },
};
