/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // for Vite main HTML
    "./src/**/*.{js,jsx,ts,tsx}",  // all React components
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
