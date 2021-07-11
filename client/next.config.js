// TODO::Configure with atomic css
// const withAtomicCss = require("next-atomic-css");
// const path = require('path');
// ------------------------------------------
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Dashboard',
        permanent: true,
      },
    ];
  },
  cssOptions: {
    // https://github.com/webpack-contrib/css-loader#options
  },
  sassOptions: {
    // https://github.com/webpack-contrib/sass-loader#options
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};
