'use strict'

module.exports = {
  parser: 'babel-eslint',

  extends: [
    '@strv/javascript/environments/nodejs/v10',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/coding-styles/recommended',
  ],

  rules: {
    // If your editor cannot show these to you, occasionally turn this off and run the linter
    'no-warning-comments': 0,
  },

  overrides: [{
    files: [
      '**/*.test.mjs',
    ],

    env: {
      mocha: true,
    },

    globals: {
      expect: true,
      sinon: true,
    },

    rules: {
      'max-classes-per-file': 'off',
    },
  }, {
    // Custom settings for plain JavaScript files
    files: [
      '*.js',
      '.*.js',
    ],

    parserOptions: {
      sourceType: 'script',
    },
  }],
}
