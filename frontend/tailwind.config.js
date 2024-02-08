/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turquoise: "#91CDE7",
        status: "#43b7e8",
      },
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
      jockey: ["Jockey One", "sans-serif"],
    },
  },
  plugins: [],
};
