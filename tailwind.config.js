/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gf-green': '#005a48', 
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