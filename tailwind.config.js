/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f8ff',
          100: '#e5edff',
          200: '#d2ddff',
          300: '#a7baff',
          400: '#6f8bff',
          500: '#3f5fe6',
          600: '#2f47b4',
          700: '#263b93',
          800: '#1c2c70',
          900: '#152154',
          DEFAULT: '#3f5fe6',
          dark: '#263b93',
          light: '#a7baff'
        },
        accent: {
          amber: '#F9A21B',
          amberDark: '#C77900',
          amberLight: '#FFE0A3'
        },
        surface: {
          base: '#0b1220',
          muted: '#0f162a',
          elevated: '#1b2437',
          overlay: '#0b1220cc'
        },
        border: {
          subtle: '#e2e8f0',
          strong: '#94a3b8',
          inverted: '#1f2937'
        },
        text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#475569',
          inverted: '#e2e8f0'
        }
      },
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem'
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.08)',
        strong: '0 20px 60px rgba(15, 23, 42, 0.15)'
      },
      spacing: {
        18: '4.5rem'
      }
    }
  },
  plugins: []
};
