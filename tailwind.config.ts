import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'elegant': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'selection': '#6b7280', // gray-500
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function({ addUtilities }: PluginAPI) {
      addUtilities({
        '::selection': {
          'background-color': '#6b7280',
          'color': 'white',
        },
        '::-moz-selection': {
          'background-color': '#6b7280',
          'color': 'white',
        },
      })
    }
  ],
} satisfies Config;
