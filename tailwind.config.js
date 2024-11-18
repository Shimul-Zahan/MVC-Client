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
        dark_bg: '#131C21',
        dark_bg2: '#111B21',
        light_text: '#000',
        dark_text: '#fff',
        button: '#6a7175',
        sidebar_bg: '#111B21'
      }
    },
  },
  plugins: [],
}

