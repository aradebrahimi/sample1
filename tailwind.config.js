const defaultTheme = require("tailwindcss/defaultTheme");
import pluginColors from "./src/plugins/colors";
import { boxShadow } from "./src/plugins/boxShadows";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./node_modules/@sample1/ui-kit/dist/*.{css,js}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/*.{js,vue,ts}",
    "./views/**/**/*.vue",
    "./views/**/*.vue",
    "./App.vue",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "577px",
      lg: "992px",
      xl: "1201px",
    },
    maxWidth: {
      sm: "100%",
      md: "100%",
      lg: "960px",
      xl: "1140px",
    },
    colors: { transparent: "transparent", ...pluginColors },
    extend: {
      fontFamily: {
        sans: ["IRANSans !important", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: { ...boxShadow },
    },
  },
  plugins: [],
};
