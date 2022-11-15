const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./renderer/src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      mono: "Source Code Pro",
    },
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      neutral: {
        100: "#5c5589",
        200: "#3f3a5a",
        300: "#130b43",
      },
    },

    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
