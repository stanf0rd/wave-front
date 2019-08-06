module.exports = {
  extensions: ['.pcss'],
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({ stage: 3 }),
    require('postcss-nested'),
    require('postcss-google-font'),
  ],
};
