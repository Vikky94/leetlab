import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1E1E1E',
        'light-text': '#D4D4D4',
        'heading-text': '#F5F5F5',
        'primary': '#007ACC',
        'success': '#98C379',
        'error': '#D16969',
      },
    }
  },
  plugins: [],
}
export default config


