/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clash_regular: ['clash_regular'],
        funnel_display: ['funnel_display']
      }
    }
  },
  plugins: [],
}

