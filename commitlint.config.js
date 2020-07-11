module.exports = {
  extends: ['@hover/javascript/commitlint'],
  rules: {
    'scope-enum': [1, 'always', ['deps', 'deps-dev']],
  },
};
