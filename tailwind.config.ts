import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    screens: {
      mobile: { max: '575.98px' },

      mobilemd: { min: '575.99px', max: '767.98px' },

      tablet: { min: '767.99px', max: '991.98px' },

      desktop: { min: '991.99px', max: '1199.98px' },

      lgdevices: '1199.99px'
    }
  },
  plugins: []
}
export default config
