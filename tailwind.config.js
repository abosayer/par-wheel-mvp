/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { blue: "#3B82F6" } },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: [],
};
