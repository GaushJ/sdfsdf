import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      width: {
        '420': '420px',
      },
      minWidth: {
        '104': '104px',
      },
      maxWidth: {
        '512': '512px',
      },
      maxHeight: {
        '270': '270px'
      },
      height: {
        '96-px': '96px'
      },
      colors: {
        black: '#141527',
        black_100: '#2E2E3A',
        inputColorBorder: 'rgba(0, 0, 0, 0.15)',
        inputColorError: '#FF4D4F',
        blue: '#3649ff',
        mediumGray: '#B7B7BB',
        mediumGray_100: '#908e8d',
        mediumGray_101: '#8A8A8F',
        mediumGray_102: '#6D6E7A',
        breadcrumbColorDim: 'rgba(0, 0, 0, 0.45)',
        breadcrumbColorActive: 'rgba(0, 0, 0, 0.88)',
      }
    },
  },
  plugins: [],
}
export default config;
