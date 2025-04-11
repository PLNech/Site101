import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Include a special safelist file that will contain all classes we want to ensure are generated
    './src/safelist.txt',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e4eeff',
          200: '#d0e0ff',
          300: '#b2ccff',
          400: '#84a9ff',
          500: '#2970ff',
          600: '#2e41ff',
          700: '#1a26e0',
          800: '#1a24b7',
          900: '#1c2791',
          950: '#141655',
        },
        // Add missing custom colors from CSS variables
        background: 'var(--background)',
        'background-dark': 'var(--background-dark)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
      },
      textColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
      },
      backgroundColor: {
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
      },
      borderColor: {
        border: 'var(--border)',
      },
      zIndex: {
        '99999': '99999',
      },
    },
  },
  plugins: [],
};

export default config;
