/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/scripts/**/*.js"],
  theme: {
    colors: {
      'primary': '#FFD15B',
      'grey': '#7A7A7A',
      'background': '#EDEDED',
      'black': '#1B1B1B',
      'white': '#FFFFFF',
    },
    fontFamily: {
      'display': ['Anton', 'sans-serif'],
      'body': ['Manrope', 'sans-serif']
    },
    extend: {
      fontSize: {
        '5xl': ['2.75rem', {
          lineHeight: '4.125rem',
          fontWeight: '400'
        }]
      },
      backgroundImage: {
        'header': "url('../les_petits_plats/assets/images/bg_header.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

