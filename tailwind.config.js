/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        blue: "#247297",
        blue_hover: "#185b7a",
        white_gray: "#D1D5DB",
        link_color: "#0c83ff",
        cancel: "#E6E6E6",
      },
      borderRadius: {
        smd: "4px",
      },
      backgroundImage: (theme) => ({
        landingPageBg: "url('./assets/image/Product.png')",
        newProductPageBg: "url('./assets/image/new_product.jpg')",
      }),
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
