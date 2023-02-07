/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-violet": "#B095FF",
        "primary-green": "#62C46E",
        "primary-yellow": "#F9E000",
        "common-black": "#333333",
        "commom-gray": "#999999",
        "textColor-gray-100": "#6F6F6F",
        "textColor-gray-50": "#C7C7C7",
        "borderColor-gray": "#D9D9D9",
        error: "#FF5252",
      },
      backgroundImage: {
        mainImg: "url('../../../public/asset/image/main-img.png')",
      },
      fontFamily: {
        myfont: ["worksans", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
