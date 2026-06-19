import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean & Logistics Theme Colors
        'ocean': {
          deep: '#005F73',
          sky: '#21C7B7',
          light: '#94D2BD',
        },
        'accent': {
          orange: '#EE9B00',
          orangeHover: '#CA7C00',
        },
        'neutral': {
          beige: '#E9D8A6',
          white: '#FFFFFF',
          lightGray: '#F5F6F7',
          darkBlue: '#222222',
          gray: '#6c757d',
          footer: '#001219',
        },
        // Legacy colors for compatibility
        'primary': {
          blue: '#21C7B7',
          indigo: '#005F73',
          purple: '#6f42c1',
        },
        'status': {
          success: '#198754',
          danger: '#dc3545',
          warning: '#ffc107',
          info: '#21C7B7',
        },
      },
    },
  },
  plugins: [],
};

export default config;
