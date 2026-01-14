/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-bg': '#f8fafc',
        'solar-blue': '#0ea5e9',
        'solar-purple': '#8b5cf6',
        'pure-white': '#ffffff',
        'soft-gray': '#f1f5f9',
        'slate-800': '#1e293b',
        'glass-light': 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-light': '0 0 30px rgba(14, 165, 233, 0.2)',
        'card-float': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
