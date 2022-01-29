module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Kalam', 'sans-serif']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}
