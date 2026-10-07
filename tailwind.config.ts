import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chinese: {
          red: "#DE2910",
          gold: "#FFDE00",
          paper: "#FAFAF7",
          dark: "#1A1A1A",
          slate: "#334155",
        },
      },
      fontFamily: {
        hanzi: [
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Source Han Sans SC"',
          '"Noto Sans SC"',
          '"SimHei"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
