/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content:  ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        Secondary: '#00BCD4',
        Accent: '#FFFFFF',
        Background: '#121212',
        Text: '#E0E0E0'
      }
    },
  },
  plugins: [],
}