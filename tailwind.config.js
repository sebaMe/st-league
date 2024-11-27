import colors from "tailwindcss/colors";

import { screenBreakpoints } from "./src/constants/breakpoints.constants";
import { primaryPurple } from "./src/constants/colors.constants";

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
        primary: primaryPurple,
        secondary: "#ffc107",
        highlight: "#f35f0f",
        surface: {
          DEFAULT: "#31cc5d",
          dark: "#008ef3"
        },
        white: "#ffffff",
        black: "#000000",
        danger: colors.red,
        success: colors.green,
        warn: colors.yellow,
        info: colors.blue,
        rare: colors.blue,
        epic: colors.violet,
        legendary: colors.orange,
        unique: colors.pink
      },
      screens: screenBreakpoints
    }
  },
  plugins: [import("tailwindcss-primeui")]
};
