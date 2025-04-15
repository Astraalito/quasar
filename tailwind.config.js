module.exports = {
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
        keyframes: {
          pulseSlow: {
            '0%, 100%': { transform: 'scale(1)', opacity: '1' },
            '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          },
        },
        animation: {
          'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }