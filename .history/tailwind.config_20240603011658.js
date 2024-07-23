/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // White
        secondary: "#7B0323",
        lipstick: "#ffedf0",
      },
      width: {
        sidebar: "223px",
        side: "223px",
      },
      fontFamily: {
        inter: ['Inter var', 'sans'], // Default font family
        poppins: ['Poppins', 'sans'], // Custom font family (Poppins)
      }
    },
  },
  plugins: [require('flowbite/plugin'),
 
],
}

