/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#1E7A47',
        accentLight: '#29a35f',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.1)',
        button: '0 4px 6px rgba(30,122,71,0.3)',
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
