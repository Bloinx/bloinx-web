module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'react-hooks',
  ],
  rules: {
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
      },
    ],
    'no-console': 1,
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreComments: true,
      },
    ],
    'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
    'react/require-default-props': 'off', // Allow non-defined react props as undefined
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': ['off'],
  },
};
