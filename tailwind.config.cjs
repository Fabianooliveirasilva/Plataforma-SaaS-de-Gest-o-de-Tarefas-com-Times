/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "hsl(var(--surface))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
      borderRadius: {
        xl: "0.9rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(15, 23, 42, 0.2)",
      },
    },
  },
  plugins: [],
};
