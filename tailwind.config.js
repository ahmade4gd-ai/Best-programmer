/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#020617",
          green: "#10b981", // Emerald for Jordan
          gold: "#f59e0b",  // Amber for Desert/Heritage
          blue: "#06b6d4",  // Cyan for Tech
          red: "#ef4444",   // Red for Alarms
        }
      },
      backgroundImage: {
        'grid-pattern': "url('/assets/grid.svg')",
        'heritage-gradient': "linear-gradient(to bottom, rgba(2,6,23,0.8), rgba(2,6,23,1))",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.5s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
  }
