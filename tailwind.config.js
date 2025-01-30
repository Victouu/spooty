module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          1: "#0F0C24", // Fond principal
          2: "#1A1734", // Surface
          3: "#2A274A", // Surbrillance
        },
        purple: {
          300: "#C3B5FD", // Texte secondaire
          500: "#8A6BF6", // Texte principal
          700: "#5A43D9", // Accents
        },
        gray: {
          100: "#F5F3FF", // Texte clair
          400: "#B8B5CC", // Texte secondaire
          700: "#4A4869", // Bordures
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Police principale
      },
    },
  },
  plugins: [],
};
