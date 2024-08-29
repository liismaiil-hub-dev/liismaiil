import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const { nextui } = require("@nextui-org/react");



const config: Config = {
  darkMode: 'class',
  content: [
    "./components/**/*.{jsx,tsx}",
    "./app/**/*.{jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        //        padding: "10px"
      },
      keyframes: {
        wavey: {
          "0%, 100%": {
            transform: "scaleY(0.5)",
          },
          "50%": {
            transform: "scaleY(1.5)",
          },
        },
        gling: {
          "0%, 100%": {
            transform: "translate(100px, 200px)",
          },
          "50%": {
            transform: "translate(0px,0px)",
          },
        },
        zoomIn: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
        },
      },
      animation: {
        wavey: "wavey 1000ms linear infinite",
        gling: "gling 1000ms linear infinite",
        zoomIn: "zoomIn 1000ms ease-in-out ",
      },
      colors: {
        natheader: "#DEF9C4",
        natprimary: "#9CDBA6",
        natsecondary: "#50B498",
        nattertiary: "#468585",
        natquadrenary: "#808836",
        
        natWarmheader: "#DEF9C4",
        natWarmprimary: "#FFBF00",
        natWarmsecondary: "#FF9A00",
        natWarmtertiary: "#D10363",
        natWarmquadrenary: "#EE4E4E",

        appheader: "#CDFADB",
        appprimary: "#F6FDC3",
        appsecondary: "#FFCF96",
        apptertiary: "#FF8080",
        appquadrenary: "#FFCF81",
 
        body: "#E1F7F5",
        coldbody: "#EEF5FF",
        hotbody: "#E6FF94",
        lightbody: "#F6FB7A",
      },

      important: true,

      //   screens: {
      //    "2xl": { min: "1280px" },
      // => @media (max-width: 1535px) { ... }

      //  xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      //lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      // md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      //sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      //},

    },
  },
  plugins: [
  require("flowbite/plugin"), nextui()],
};
export default config;
