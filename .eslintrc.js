module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [],
      },
    ],

    'comma-dangle': [
      'error',
      'always-multiline',
      {
        functions: 'never',
      },
    ],
    'block-spacing': 'error',
    'no-alert': 0,
    'import/no-named-as-default': 0,
    'linebreak-style': ['warn', 'windows'],
    'lines-between-class-members': ['error', 'always'],
    'no-underscore-dangle': ['off', 'allow'],
    'no-return-assign': ['warn', 'always'],
    'react/no-array-index-key': 'warn',

    'function-paren-newline': [
      'error',
      {
        minItems: 3,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        minProperties: 1,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
  },
};
