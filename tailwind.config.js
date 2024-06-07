/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorDark1: '#112D4E',
        colorDark2: '#3F72AF',
        colorLight1: '#DBE2EF',
        colorLight2: '#F9F7F7',
      },
    },
  },
  plugins: [],
}
