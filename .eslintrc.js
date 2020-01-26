module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  plugins: [
    'jest',
    'svelte3',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off',
        'no-multiple-empty-lines': 'off',
      }
    }
  ],
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
    'no-return-assign': 'off',
  },
};
