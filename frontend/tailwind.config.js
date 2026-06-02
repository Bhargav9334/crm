/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui"],
        heading: ['"Poppins"', "sans-serif"],
      },
      boxShadow: {
        
      },
      backgroundImage: {
      
      },
      borderRadius: {
      },
    },
  },
  plugins: [],
  theme: {
    extend: {
      screens: {
        tablet: '700px',
      },
    },
  },
}
