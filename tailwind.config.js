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
        "primary-violet": "#B095FF",
        "primary-green": "#62C46E",
        "basic-gray1": "#999999",
        "text-gray1": "#6F6F6F",
        "text-gray2": "#C7C7C7",
        "border-gray1": "#D9D9D9",
        error: "#FF5252",
      },
    },
  },
  plugins: [],
};
