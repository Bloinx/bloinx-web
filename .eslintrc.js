module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
  ],
  env: {
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [0],
    'no-underscore-dangle': ['error', { allow: ['__REDUX_DEVTOOLS_EXTENSION__', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '_address'] }],
  },
};
