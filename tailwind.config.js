import { white as _white, gray as _gray, blue as _blue } from "tailwindcss/colors";

export const content = ["./src/**/*.{js,ts,jsx,tsx}", "index.html"];
export const theme = {
  fontFamily: {
    sans: ["ui-sans-serif", "system-ui"],
    mono: "Source Code Pro",
  },

  colors: {
    // use colors only specified
    white: _white,
    gray: _gray,
    blue: _blue,
    neutral: {
      100: "#5c5589",
      200: "#3f3a5a",
      300: "#130b43",
    },

    select: {
      custom: "none",
    },
  },

  extend: {
    animation: {
      "spin-slow": "spin 3s linear infinite",
    },
  },
};
export const plugins = [];
