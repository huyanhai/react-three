const IS_PROD = process.env.NODE_ENV !== 'development';
const twBaseName = '';
module.exports = {
  mode: IS_PROD ? '' : 'jit',
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontSize: {
        [`${twBaseName}base`]: ['12px', { lineHeight: 0 }]
      }
    }
  },
  variants: {
    extend: {}
  },
  // prefix: '',
  plugins: []
};
