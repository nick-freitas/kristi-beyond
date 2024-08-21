/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        journalPages: "url('/assets/journal_layout_background.jpg')",
        appBackground: "url('/assets/fantasy_tarot.webp')",
      },
    },
  },
  plugins: [],
};
