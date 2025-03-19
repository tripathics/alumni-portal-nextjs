import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "550px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        "50": "200px",
      },
      clipPath: {
        rect: "polygon(0 0,100% 0,100% 100%,0 100%)",
        "h-line": "polygon(0 0,100% 0,100% 0,0 0)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        link: "hsl(var(--link))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-dark": {
          DEFAULT: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-dark-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundSize: {
        "size-header-large": "75%",
      },
      backgroundImage: {
        "header-large":
          "linear-gradient(90deg, hsl(0 0% 7%) 0%, hsl(0 0% 7%) 13%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.5) 70%, hsl(0 0% 7%) 87%, hsl(0 0% 7%) 100%)",
        "header-mobile":
          "linear-gradient(rgb(0 0 0 / 0.53) 0%, rgb(0 0 0 / 0.55) 100%)",
      },
      boxShadow: {
        box: "var(--box-bs)",
      },
      translate: {
        "11/5": "220%",
        "5/2": "250%",
      },
    },
  },
  plugins: [
    animate,
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".clip-rect": {
          clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
        },
        ".clip-h-line": {
          clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
        },
      };

      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
