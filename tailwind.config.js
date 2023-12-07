/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Configure your color palette here
      background: "#03071e",
      light_background: "#003049",
      slate: "#64748b",
      cyan: "#2A9D8F",
      yellow: "#E9C46A",
      orange: "#E76F51",
      highlight: "#3d5a80",
      white: "#fff8f0",
      highlight_white: "#ffffff",
      black: "#0a0908",
      blue: "#3d5a80",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
