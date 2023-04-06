/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-violet": "#B095FF",
        "primary-green": "#D1F090",
        "primary-yellow": "#F9E000",
        "common-black": "#333333",
        "common-gray": "#999999",
        "textColor-gray-100": "#6F6F6F",
        "textColor-gray-50": "#C7C7C7",
        "borderColor-gray": "#D9D9D9",
        error: "#FF5252",
      },
      backgroundImage: {
        gradient: "url('../../public/asset/image/gradient.jpg')",
      },
      fontFamily: {
        myfont: "worksans",
      },
      keyframes: {
        popup: {
          "0%": { transform: "translate(30px,-60px)", opacity: "0%" },
          "50%": { transform: "translate(30px,-12px)" },
          "80%": { opacity: "100%" },
          "100%": { transform: "translate(30px,-24px)" },
        },
        hide: {
          "0%": { transform: "translate(30px,-24px)", opacity: "100%" },
          "50%": { transform: "translate(30px,-10px)", opacity: "100%" },
          "80%": { opacity: "0%" },
          "100%": { transform: "translate(30px,-100px)", opacity: "0%" },
        },
        bottomsheet: {
          "0%": { transform: "translate(-20px,350px)" },
          "100%": { transform: "translate(-20px,0)" },
        },
        accordion1: {
          "0%": { height: "0px" },
          "100%": { height: "600px" },
        },
        accordion2: {
          "0%": { height: "0px" },
          "100%": { height: "125px" },
        },
      },
      animation: {
        popup: "popup 0.8s ease-out forwards",
        hide: "hide 0.8s ease forwards",
        bottomsheet: "bottomsheet 0.4s ease forwards",
        accordion1: "accordion1 0.5s ease forwards",
        accordion2: "accordion2 0.5s ease forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
