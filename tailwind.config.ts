import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#F9A8D4",
          50: "#FFF0F7",
          100: "#FFE0EF",
          200: "#FFC2DF",
          300: "#FFA3CF",
          400: "#F9A8D4",
          500: "#F472B6",
          600: "#EC4899",
          700: "#DB2777",
          800: "#BE185D",
          900: "#9D174D",
        },
        secondary: {
          DEFAULT: "#C4B5FD",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#FBBF24",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        cream: {
          DEFAULT: "#FDF8F0",
          50: "#FFFEF9",
          100: "#FDF8F0",
          200: "#FAF0E0",
          300: "#F5E6CC",
        },
        rose: {
          light: "#FEE2E2",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #F9A8D4 0%, #C4B5FD 100%)",
        "gradient-gold": "linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)",
        "gradient-soft": "linear-gradient(135deg, #FFF0F7 0%, #F5F3FF 50%, #FFFBEB 100%)",
        "gradient-hero": "linear-gradient(135deg, #FFF0F7 0%, #EDE9FE 50%, #FDF8F0 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(249,168,212,0.1) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(249,168,212,0.2)",
        "glass-lg": "0 16px 48px rgba(196,181,253,0.25)",
        soft: "0 4px 20px rgba(249,168,212,0.15)",
        card: "0 2px 16px rgba(196,181,253,0.2)",
        gold: "0 4px 20px rgba(251,191,36,0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
