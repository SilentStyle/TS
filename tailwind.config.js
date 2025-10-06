/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./admin/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'riad-gold': '#D4AF37',
        'riad-dark': '#1A1A1A',
        'riad-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
}