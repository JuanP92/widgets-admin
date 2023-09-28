const { host } = require('@personal-micro-front/mf-default-test.transformers.host');
const {
  tailwindTransformer,
} = require('@learnbit/styling.transformers.tailwind');

module.exports.default = {
  name: 'host-app',
  entry: [require.resolve('./host-app.app-root')],
  portRange: [3020, 3030],
  webpackTransformers: [host, tailwindTransformer({})],
};
