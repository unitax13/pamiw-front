/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  // content: ["./src/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        roboto: ["'Roboto'", "sans-serif"],
        rubik: ["'Rubik'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
