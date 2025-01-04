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
        primary: "#dd3333",
        secondary: "#ffa343",
        white: "#ffffff",
        "primary-light": "#ff4444",
        "secondary-light": "#ffb463",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale': 'scale 0.2s ease-in-out',
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
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'custom': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'hover': '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
