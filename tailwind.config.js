import { defineConfig } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        base: '1.25rem', // ejemplo de texto más grande: 20px
      },
    },
  },
  plugins: [],
});
