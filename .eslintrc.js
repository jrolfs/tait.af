module.exports = {
  extends: require.resolve('@hover/javascript/eslint'),
  rules: {
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
};
