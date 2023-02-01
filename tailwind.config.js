/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color1": "#B095FF",
        "primary-color2": "#62C46E",
        gray1: "#999999",
        "fontColor-gray1": "#6F6F6F",
        "fontColor-gray2": "#C7C7C7",
        "borderColor-gray1": "#D9D9D9",
        error: "#FF5252",
      },
    },
  },
  plugins: [],
};
