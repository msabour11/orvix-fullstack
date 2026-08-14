/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orvix: {
          dark: '#0a1628',
          navy: '#0f1f3d',
          blue: '#1e3a5f',
          primary: '#1e40af',
          accent: '#059669',
          green: '#10b981',
          light: '#f8fafc',
          white: '#ffffff',
          gray: '#64748b',
        }
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
