/* eslint-disable global-require */

module.exports = {
  extensions: ['.pcss'],
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({ stage: 3 }),
    require('postcss-nested'),
    require('postcss-google-font'),
    require('postcss-custom-media')({
      importFrom: ['./src/styles/custom-media.pcss'],
    }),
  ],
};
