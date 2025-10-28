/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FD661F',
        secondary: '#36CF59',
        'accent-red': '#E63946',
        'accent-yellow': '#FFB84C',
        'pastel-bg': '#EFF6FF',
        'glass-white': 'rgba(255, 255, 255, 0.35)',
        'glass-border': 'rgba(255, 255, 255, 0.25)',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
