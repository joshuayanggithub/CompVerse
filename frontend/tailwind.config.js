/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turquoise: "#91CDE7",
      },
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
    },
  },
  plugins: [],
};
