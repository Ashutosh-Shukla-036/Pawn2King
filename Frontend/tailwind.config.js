module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ping: {
          '0%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        pulse: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
        bounce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
