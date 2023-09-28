// force bit to recognize this as dependency
require('@teambit/react.eslint-config-bit-react');

module.exports = {
  extends: [require.resolve('@teambit/react.eslint-config-bit-react')],
  settings: {
    'mdx/code-blocks': true,
    jest: {
      version: 29,
    },
    react: {
      version: '18.0',
    },
  },
  rules: {},
};
