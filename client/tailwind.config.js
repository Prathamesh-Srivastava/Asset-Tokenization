/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #101213 0%, #011021 50%, rgba(8, 49, 95, 0.91) 92%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}