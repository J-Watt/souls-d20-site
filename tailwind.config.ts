import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: { bg: "#0f1115", surface: "#151923", accent: "#8b5cf6", text: "#e5e7eb" }
      },
      boxShadow: { soft: "0 10px 25px rgba(0,0,0,0.25)" }
    }
  },
  plugins: []
};
export default config;
