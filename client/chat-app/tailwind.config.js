/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Custom breakpoint
        'sm': '640px', // Tailwind's default breakpoint
        'md': '768px', // Tailwind's default breakpoint
        'lg': '1024px', // Tailwind's default breakpoint
        'xl': '1280px', // Tailwind's default breakpoint
        '2xl': '1536px', // Tailwind's default breakpoint
        // Add more custom breakpoints here
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

