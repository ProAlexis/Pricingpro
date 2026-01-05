/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- ON AJOUTE CETTE LIGNE ICI
  theme: {
    extend: {
      // Tu peux laisser vide ou avec tes extensions actuelles
    },
  },
  plugins: [],
}