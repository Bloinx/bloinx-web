const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#F58F98",
              "@link-color": "#90525A",
              "@border-radius-base": "2px",
              "@background": "#121212",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
