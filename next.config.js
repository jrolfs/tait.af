// eslint-disable-next-line import/no-extraneous-dependencies
const withTM = require('next-transpile-modules')([
  'three/examples/jsm/loaders/GLTFLoader',
]);

module.exports = withTM();
