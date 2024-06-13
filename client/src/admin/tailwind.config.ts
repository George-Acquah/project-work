import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit', // Enable JIT mode
  darkMode: "class",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "var(--brand-primary)", // blue-200
            subtle: "var(--brand-secondary)", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "var(--bg-muted)", // gray-50
            // subtle: "#f3f4f6", // gray-100
            // DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "var(--border-primary)", // gray-200
          },
          ring: {
            DEFAULT: "var(--border-primary)", // gray-200
          },
          // outline: {
          //   DEFAULT: "var(--border-primary)",
          // },
          // content: {
          //   subtle: "#9ca3af", // gray-400
          //   DEFAULT: "#6b7280", // gray-500
          //   emphasis: "#374151", // gray-700
          //   strong: "#111827", // gray-900
          //   inverted: "#ffffff", // white
          // },
        },
        custom: {
          background: {
            "primary-dark": "#2C3E50",
            "primary-light": "#F5F5F5",

            "secondary-dark": "#1E2E3C",
            "secondary-light": "#E0E0E0",
          },
          content: {
            "subtle-light": "#333333",
            "subtle-dark": "#ECF0F1",

            "strong-light": "#333333",
            "strong-dark": "#F2F2F2",
          },
          button: {
            "primary-light": "#3498DB",
            "primary-dark": "#3498DB",
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700

            "danger-light": "#E74C3C",
            "danger-dark": "#E74C3C",
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
        },
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
      animation: {
        bounce1: "bounce 1.4s infinite ease-in-out",
        bounce2: "bounce 1.4s infinite ease-in-out -0.4667s",
        bounce3: "bounce 1.4s infinite ease-in-out -0.9333s",
      },
      screens: {
        md2: "770px",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
export default config;
