/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        primaryHover: "#646cffc2",
        secondary: "#535bf2",
      },
    },
  },
  plugins: [],
};
