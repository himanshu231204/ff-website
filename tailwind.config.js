/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'esports-dark': '#0f0f1a',
        'esports-card': '#1a1a2e',
        'esports-purple': '#8b5cf6',
        'esports-blue': '#3b82f6',
      }
    },
  },
  plugins: [],
}
