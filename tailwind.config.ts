import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--apple-bg)',
        foreground: 'var(--apple-text)',
        'apple-blue': 'var(--apple-blue)',
        'apple-blue-hover': 'var(--apple-blue-hover)',
        'apple-bg': 'var(--apple-bg)',
        'apple-text': 'var(--apple-text)',
        'apple-subtext': 'var(--apple-subtext)',
        'apple-border': 'var(--apple-border)',
        'apple-card': 'var(--apple-card)',
        'apple-gray': 'var(--apple-gray)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
