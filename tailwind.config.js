/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // bắt buộc dùng class mode để next-themes hoạt động
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "rgb(var(--color-bg) / <alpha-value>)",
          foreground: "rgb(var(--color-text) / <alpha-value>)",
          primary: "rgb(var(--color-primary) / <alpha-value>)",
        },
      },
    },
    plugins: [],
  };
  