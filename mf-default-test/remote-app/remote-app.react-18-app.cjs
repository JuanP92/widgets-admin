// replace with your own transformer
const {
  remote: remoteTransformer,
} = require('@personal-micro-front/mf-default-test.transformers.remote');
const {
  tailwindTransformer,
} = require('@learnbit/styling.transformers.tailwind');

const netlify = {
  team: 'teambit',
  accessToken: process.env.NETLIFY_AUTH_TOKEN,
  productionSiteName: 'bit-mf-remote',
  useDefaultRedirectsForSPA: true,
};

module.exports.default = {
  name: 'remote-app',
  portRange: [60000, 60000],
  entry: [require.resolve('./remote-app.app-root')],
  webpackTransformers: [
    (config, ctx) => {
      return remoteTransformer(config, ctx, require.resolve('./app'));
    },
    tailwindTransformer({}),
  ],
};
