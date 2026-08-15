/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        river: {
          DEFAULT: '#0B3D91',
          light: '#144a9e',
          deep: '#071f4a',
        },
        emerald: {
          DEFAULT: '#2E8B57',
          light: '#3aa86c',
        },
        saffron: {
          DEFAULT: '#F4B400',
          light: '#ffc93c',
        },
        navy: {
          950: '#050b16',
          900: '#0a1628',
          800: '#0f1f38',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
        'glow-saffron': '0 0 40px rgba(244, 180, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
