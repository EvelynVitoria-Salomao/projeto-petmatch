/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#27607B",
        secondary: "#FF7A00",
        accent: "#E5B300",
        white: "#FFFFFF",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },  
  },    
  plugins: [],
}