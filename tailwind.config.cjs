/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    // colors: {
    //   merah: "#FF0000",
    // },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
