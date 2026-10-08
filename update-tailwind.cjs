const fs = require('fs');
const file = 'tailwind.config.js';

const config = /** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#fcfafb',
          100: '#f4edf1',
          200: '#e5d7df',
          300: '#d1b8c6',
          400: '#b48ea4',
          500: '#926881',
          600: '#754f65',
          700: '#5e3f50',
          800: '#4d3442',
          900: '#402e38',
          950: '#261720', // Very dark plum for main text
        },
        burgundy: {
          50: '#fbf3f5',
          100: '#f6e4e8',
          200: '#efccd4',
          300: '#e1a6b7',
          400: '#ce7691',
          500: '#b84d6f',
          600: '#9a3254', // Rich cherry red/burgundy from logo
          700: '#812443',
          800: '#6d213b',
          900: '#5c1f34',
          950: '#340e1a',
        },
        gold: {
          50: '#fbf8f0',
          100: '#f5ecd3',
          200: '#ecd9a6',
          300: '#e0c078',
          400: '#d4a852',
          500: '#c69338',
          600: '#a8762c',
          700: '#855a25',
          800: '#6e4823',
          900: '#5d3c21',
          950: '#341f0f',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide-2': '0.15em',
        'wide-3': '0.25em',
      },
      transitionTimingFunction: {
        'lux': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'snap': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in': 'slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'draw-line': 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-reveal': 'textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
        'shimmer-sweep': 'shimmerSweep 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        drawLine: {
          '0%': { width: '0' },
          '100%': { width: '4rem' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-150%) skewX(-15deg)' },
          '20%': { transform: 'translateX(150%) skewX(-15deg)' },
          '100%': { transform: 'translateX(150%) skewX(-15deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};;
fs.writeFileSync(file, config, 'utf8');
console.log('tailwind updated');
