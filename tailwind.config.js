/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        appBackground: "url('/assets/app-background.jpg')",
        journalPages: "url('/assets/journal-background.jpg')",
      },
    },
  },
  plugins: [],
};
