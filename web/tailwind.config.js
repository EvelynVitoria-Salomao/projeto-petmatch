/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#27607B",  // azul
        secondary: "#FF7A00", // laranja
        accent: "#E5B300", // amarelo
        white: "#FFFFFF",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    plugins: [],
  }
}