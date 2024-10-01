import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "test-gradient": "linear-gradient(90deg, #FFC593 0%, #BC7198 100%)",
        "pulse-gradient":
          "linear-gradient(135deg, #1A1A1D 0%, #229799 100%, #F8485E 200%)",
      },
      colors: {
        // Custom palette for Pulse's abstract and expressive style
        "pulse-dark": "#1A1A1D", // Dark background for contrast
        "pulse-primary": "#48CFCB", // Bright teal to represent dynamic, bold contrast
        "pulse-secondary": "#F8485E", // Vivid red for emotional contrast
        "pulse-accent": "#FFD700", // Gold accent for highlights and intensity
        "pulse-gray": "#424242", // Gray to balance darker emotional tones
        "pulse-light": "#F5F5F5", // Light background for high contrast with bold colors
        "pulse-muted": "#BC7198", // Muted purple to provide a calming secondary tone
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      layout: {
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "14px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#F5F5F5",
            foreground: "#229799",
            primary: "#F8485E", // Strong, emotional red for contrast
            secondary: "#424242",
            content1: "#FFD700", // Gold as an accent color
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#111827",
            foreground: "#48CFCB", // Bright teal for the dark theme
            primary: "#F8485E", // Vivid red for emotional energy
            secondary: "#424242",
            content1: "#FFD700", // Accent color for pops of light
          },
        },
      },
    }),
  ],
};

export default config;