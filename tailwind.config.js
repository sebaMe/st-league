import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    fontFamily: {
      header: "PressStart2P",
      content: "VT323"
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f35f0f",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed8aa",
          300: "#fdbb74",
          400: "#fb943c",
          500: "#f97516",
          600: "#f35f0f",
          700: "#c2430c",
          800: "#9a3512",
          900: "#7c2e12"
        },
        secondary: "#ffc107",
        highlight: "#613fd1",
        surface: {
          DEFAULT: "#31cc5d",
          dark: "#008ef3"
        },
        white: "#ffffff",
        black: "#000000",
        danger: colors.red,
        success: colors.green,
        warn: colors.yellow,
        info: colors.blue
      },
      screens: {
        "2xs": "380px",
        xs: "480px"
      }
    }
  },
  plugins: [import("tailwindcss-primeui")]
};
