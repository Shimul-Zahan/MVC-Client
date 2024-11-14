/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: '#fff',
        dark_bg: '#000',
        light_text: '#000',
        dark_text: '#fff',
      }
    },
  },
  plugins: [],
}

