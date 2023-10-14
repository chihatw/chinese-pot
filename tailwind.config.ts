import type { Config } from "tailwindcss";
import { shadcnPreset } from "./lib/shadcn-preset";

const config: Config = {
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}", // note これを追加しないと、 tailwind のクラスが解釈されない
  ],
  theme: {
    screens: {
      sm: "540px",
      // sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        main: {
          100: "#ACDABC",
          200: "#95CFB4",
          300: "#7EC3B0",
          400: "#68B7AF",
          500: "#52A2AA",
          600: "#467E96",
          700: "#3B5D82",
          800: "#30416D",
          900: "#262958",
          DEFAULT: "#52a2aa",
        },
        danger: "#f43f5e", // rose-500
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
