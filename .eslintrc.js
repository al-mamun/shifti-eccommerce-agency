/* eslint-disable quotes */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'google',

  globals: {
    SwaggerEditor: false,
  },
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'linebreak-style': 0,
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
