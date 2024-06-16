import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    extend: {},
  },
  plugins: [],
} as Config;
