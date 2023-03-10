/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-white': '#E0E3E6',
        'primary-black': '#505050',
        'lapis-lazuli': '#276EB0',
        'violet-blue': '#3340B0',
        'blue-sapphire': '#1B5E7B',
        'medium-sea-green': '#27B059',
        'dark-spring-green': '#1B7B3E',
      },
    },
  },
  plugins: [require('daisyui')],
};
