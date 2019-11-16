module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-new': 'off',
    'no-console': 'off',
    'no-multi-spaces': 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': 'off',
    'no-unused-expressions': 'off',
  },
};
