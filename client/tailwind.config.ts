import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)'],
        roboto: ['var(--font-roboto)'],
      },
      letterSpacing: {
        "extra-wider": '0.1em',
        ultra: '0.2em',
      },
      fontSize: {
        // relative font sizes
        "mini": "0.65rem",
        "ssm": "0.75rem",
        "sm": "0.85rem",
        "base": "1rem",
        "4.5xl": '2.375rem',
        // absolute font sizes
        "28px": "28px",
        "16px": "16px",
        "11px": "11px",
        "11.5px": "11.5px",
      }
    },
  },
  plugins: [],
};
export default config;
