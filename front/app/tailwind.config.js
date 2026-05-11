/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['SanFrancisco', 'sans-serif'],
        'gv': ['"Great Vibes"', 'cursive'],
        'kreadon': ['Kreadon', 'sans-serif'],
      },
    },
  },
  plugins: [],
}