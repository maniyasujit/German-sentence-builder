/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#203033',
        slatewash: '#eef4f3',
        fern: '#2f6f64',
        coral: '#cb6454',
        saffron: '#e2a53a'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(32, 48, 51, 0.10)'
      }
    }
  },
  plugins: []
};
