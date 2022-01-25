module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  env: {
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    'linebreak-style': ['error', 'windows'],
    "react/jsx-filename-extension": [0],
    "no-underscore-dangle": [
      "error",
      {
        allow: [
          "__REDUX_DEVTOOLS_EXTENSION__",
          "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
          "_address",
        ],
      },
      
    ],
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: false }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
