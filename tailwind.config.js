/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gf-green': '#00705a', 
        'gf-dark': '#0f2220',  
        'gf-darker': '#081312',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Lato', 'sans-serif'],
      }
    }
  },
  plugins: [],
}