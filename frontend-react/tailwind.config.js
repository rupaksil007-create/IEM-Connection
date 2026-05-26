/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#00FF66',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 'text-shadow': '0 0 10px #00FF66, 0 0 20px #00FF66' },
          'to': { 'text-shadow': '0 0 20px #00FF66, 0 0 30px #00FF66' },
        }
      }
    },
  },
  plugins: [],
}
