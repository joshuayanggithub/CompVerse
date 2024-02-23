/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turquoise: "#91CDE7",
        darkturquoise: "#74A4B8",
        trophygold: "#ECAE53",
        status: "#43b7e8",
      },
      keyframes: {
        jumpshaking: {
          "0%": { transform: "translateX(0)" },
          "15%": { transform: "translateY(-4px)" },
          "35%": { transform: "translateY(-4px) rotate(12deg)" },
          "55%": { transform: "translateY(-4px) rotate(-11deg)" },
          "65%": { transform: "translateY(-4px) rotate(12deg)" },
          "75%": { transform: "translateY(-4px) rotate(-11deg)" },
          "100%": { transform: "translateY(0) rotate(0)" },
        },
      },
      animation: {
        jumpshaking: "jumpshaking 2s ease-in-out infinite",
      },
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
      jockey: ["Jockey One", "sans-serif"],
    },
  },
  plugins: [],
};
