import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Dusky Rose elegant colors
        dusky: {
          rose: "hsl(var(--dusky-rose))",
          thistle: "hsl(var(--thistle))",
          hawthorne: "hsl(var(--hawthorne))",
          scepter: "hsl(var(--royal-scepter))",
          noir: "hsl(var(--blue-noir))",
          'soft-rose': "hsl(var(--soft-rose))",
          'muted-thistle': "hsl(var(--muted-thistle))",
        },
        // Legacy organic colors (mapped to dusky rose for compatibility)
        organic: {
          base: "hsl(var(--hawthorne))",
          apricot: "hsl(var(--royal-scepter))",
          natural: "hsl(var(--dusky-rose))",
          cream: "hsl(var(--soft-rose))",
          sage: "hsl(var(--muted-thistle))",
        },
        // Legacy monsoon colors (mapped to dusky rose for compatibility)
        monsoon: {
          blue: "hsl(var(--hawthorne))",
          teal: "hsl(var(--royal-scepter))",
          green: "hsl(var(--dusky-rose))",
          rain: "hsl(var(--muted-thistle))",
          cloud: "hsl(var(--soft-rose))",
          mist: "hsl(var(--dusky-rose))",
        },
        // Background palette colors
        bg: {
          sage: "hsl(var(--sage-green))",
          'light-sage': "hsl(var(--light-sage))",
          cream: "hsl(var(--cream-beige))",
          peach: "hsl(var(--warm-peach))",
          mauve: "hsl(var(--muted-mauve))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
