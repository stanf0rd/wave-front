module.exports = {
  env: {
    browser: true,
    es6: true,
  },
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
  }
};
