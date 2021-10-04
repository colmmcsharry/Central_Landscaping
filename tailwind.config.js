module.exports = {
  mode: 'jit',
  purge: [
    './**/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      "lightgreen":"var(--lightgreen)",
      "darkgreen":"var(--darkgreen)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
