/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffb000",
          50: "#FEF7E8",
          100: "#FDEFD1",
          200: "#FBDFA3",
          300: "#F9CF75",
          400: "#F7BF47",
          500: "#F5A524",
          600: "#D4880D",
          700: "#A0660A",
          800: "#6C4507",
          900: "#382304",
        },
        secondary: {
          DEFAULT: "#1E3A5F",
          50: "#E8EEF4",
          100: "#D1DDE9",
          200: "#A3BBD3",
          300: "#7599BD",
          400: "#4777A7",
          500: "#1E3A5F",
          600: "#182F4C",
          700: "#122339",
          800: "#0C1826",
          900: "#060C13",
          light: "#f7f7f7",
        },
        dark: "#1A1A1A",
        blue: {
          DEFAULT: "#1c2534",
        },
        cream: "#FFF9F2",
        "section-alt": "#FAFAF7",
        warm: {
          DEFAULT: "#F5A623",
          light: "#FFF3E0",
          dark: "#E8941A",
        },
      },
      fontFamily: {
        sans: ["FiraGO", "sans-serif"],
        caps: ["BPG Caps", "sans-serif"],
        gilroy: ["Gilroy GEO Heavy", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".font-case": {
          fontFeatureSettings: '"case" on',
        },
      });
    },
  ],
};
