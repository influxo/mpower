/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        italiana: ['italiana', 'sans-serif'],
      },
      colors: {
        'primary': '#1a2c3d',
        'secondary': '#182F3D',
        'tertiary': '#D9D9D9',
        'quaternary': '#F5F5F5',
        'light-gray': '#9E9E9E',
        'dark-gray': '#1A1A1A',
      }
    },
  },
  plugins: [],
};
