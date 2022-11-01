/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        saturation: {
          "0%": { filter: "grayscale(0.1%) saturate(100%)" },
          "10%": { filter: "grayscale(0%) saturate(120%)" },
          "20%": { filter: "grayscale(0.1%) saturate(140%)" },
          "30%": { filter: "grayscale(0%) saturate(160%)" },
          "40%": { filter: "grayscale(0.1%) saturate(180%)" },
          "50%": { filter: "grayscale(0%) saturate(200%)" },
          "60%": { filter: "grayscale(0.1%) saturate(180%)" },
          "70%": { filter: "grayscale(0%) saturate(160%)" },
          "80%": { filter: "grayscale(0.1%) saturate(140%)" },
          "90%": { filter: "grayscale(0%) saturate(120%)" },
          "100%": { filter: "grayscale(0.1%) saturate(100%)" },
        },
      },
      animation: {
        saturation: "saturation 10s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
