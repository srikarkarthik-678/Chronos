/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        title:["Dela Gothic One","sans-serif"],
        Pop:["Alan Sans","sans-serif"],
        Ciz:["Cinzel","sans-seif"]
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar'),
  ],
}