/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#2626af',
          600: '#1d1d8a',
        },
        accent: {
          50: '#f0fdfa',
          500: '#0fe2d3',
          600: '#0db5a9',
        },
        success: {
          500: '#22d3a6',
          600: '#1ba885',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
