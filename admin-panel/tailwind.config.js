/** @type {import('tailwindcss').Config} */
import { colors } from "./src/constants/colors";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure to include .tsx and .jsx for React components
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
      },
     
    },
  },
  plugins: [],
};
