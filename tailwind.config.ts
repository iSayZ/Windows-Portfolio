import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--primary-background)',
        foreground: 'var(--primary-foreground)',
        accent: 'var(--primary-accent)',
      },
      borderRadius: {
        'custom-sm': '3px',
      },
    },
  },
  plugins: [],
} satisfies Config;
