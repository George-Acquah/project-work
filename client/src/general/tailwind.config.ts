import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "custom-white": {
          "primary-dark": "#2C3E50",
          "primary-light": "#fcfcfc",

          "secondary-dark": "#1E2E3C",
          "secondary-light": "#E0E0E0",

          "subtle-dark": "",
          "subtle-light": "",

          "accent-dark": "",
          "accent-light": "",

          "emphasize-light": "",
          "emphasize-dark": "",
        },
        "custom-blue": {
          "primary-dark": "#2C3E50",
          "primary-light": "#fcfcfc",

          "secondary-dark": "#1E2E3C",
          "secondary-light": "#E0E0E0",

          "subtle-dark": "",
          "subtle-light": "",

          "accent-dark": "",
          "accent-light": "",

          "emphasize-light": "",
          "emphasize-dark": "",
        },
        "custom-green": {
          "primary-dark": "#2C3E50",
          "primary-light": "#fcfcfc",

          "secondary-dark": "#1E2E3C",
          "secondary-light": "#E0E0E0",

          "subtle-dark": "",
          "subtle-light": "",

          "accent-dark": "",
          "accent-light": "",

          "emphasize-light": "",
          "emphasize-dark": "",
        },
        "custom-black": {
          "primary-dark": "#2C3E50",
          "primary-light": "#fcfcfc",

          "secondary-dark": "#1E2E3C",
          "secondary-light": "#E0E0E0",

          "subtle-dark": "",
          "subtle-light": "",

          "accent-dark": "",
          "accent-light": "",

          "emphasize-light": "",
          "emphasize-dark": "",
        },
        current: "currentColor",
        transparent: "transparent",
        white: "#FCFCFC",
        black: "#121723",
        dark: "#1D2430",
        primary: "#4A6CF7",
        yellow: "#FBB040",
        "body-color": "#788293",
        "body-color-dark": "#959CB1",
        "gray-dark": "#1E232E",
        "gray-light": "#F0F2F9",
        stroke: "#E3E8EF",
        "stroke-dark": "#353943",
        "bg-color-dark": "#171C28",
        greenText: "#4CAF50",
        "nav-menu": "var(--menu-open-bg)",
        "text-color": "var(--text-color)",
        "nav-hover": "var(--nav-hover)",
        "primary-btn": "var(--button-primary)",
        "button-hover": "var(--button-hover)",
      },
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      borderRadius: {
        "tremor-full": "9999px",
      },
      fontSize: {
        // "tremor-label": "0.75rem",
        // "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      screens: {
        xs: "450px",
        // => @media (min-width: 450px) { ... }

        sm: "575px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1200px",
        // => @media (min-width: 1200px) { ... }

        "2xl": "1400px",
        // => @media (min-width: 1400px) { ... }
      },
    },
  },
  plugins: [],
};
export default config
