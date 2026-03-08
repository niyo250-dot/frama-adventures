/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C7A7B',
        secondary: '#285E61',
        accent: '#F6AD55',
        dark: '#1A202C'
      }
    },
  },
  plugins: [],
};