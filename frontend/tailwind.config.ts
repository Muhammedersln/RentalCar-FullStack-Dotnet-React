import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b2b', // Canlı turuncu
          light: '#ff8f5c',
          dark: '#e85a1f',
        },
        secondary: {
          DEFAULT: '#2b4c7e', // Lacivert
          light: '#3a6098',
          dark: '#1c3557',
        },
        accent: {
          DEFAULT: '#ffc107', // Altın sarısı
          light: '#ffd54f',
          dark: '#ffa000',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
          cream: '#fff9f5', // Krem rengi arka plan
        },
        surface: {
          DEFAULT: '#f8f9fa',
          dark: '#242424',
          cream: '#fff5ef', // Daha koyu krem
        },
        text: {
          DEFAULT: '#2d3748',
          light: '#718096',
          dark: '#f7fafc',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale': 'scale 0.2s ease-in-out',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'custom': '0 4px 14px 0 rgba(255, 107, 43, 0.15)',
        'hover': '0 6px 20px 0 rgba(255, 107, 43, 0.25)',
        'card': '0 2px 10px rgba(255, 107, 43, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
