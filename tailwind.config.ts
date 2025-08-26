import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: { 
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
       culturaysBg:'#020730',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
      },
      width:{
        main_slider_small:'300px',
        main_slider_big:'600px',
      },
      backgroundColor:{
        mainBg:'#0f0f1a',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    boxShadow: {
      'sharebtn':'2px 0 2px 2px rgb(249, 249, 249)',
      '4xl': '0 5px 10px 2px rgba(100, 100, 100, 0.3)', 
      '3xl': '0 35px 60px 50px rgba(0, 0, 0, 0.3)', 
      '1xl': '3px 3px 20px rgba(0,0,0,0.5)',        
      'bottomShadow':'inset 0 15px 5px -16px #111',
      "detailShadow":"-50px 20px 50px -5px rgba(0, 0, 0, 0.5)",
       "detailedShadow":"-50px 20px 50px -5px rgba(0, 0, 0, 0.5)",
      "detailShadowLight": "-10px 20px 10px -5px rgba(250, 250, 250, 0.5)",
      "headForumSpanDark":"0 3px 30px rgb(0, 0, 0)",
      "headForumSpanLight":"0 4px 10px 5px rgb(242, 242, 242)",
      
    },
      
    screens: {
      'xxs': "280px",
       'xs': "480px",
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'md-lg': '1100px',
      // => @media (min-width: 1100px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
   
  }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
