/* eslint-disable no-param-reassign */
import type {
  WebpackConfigMutator,
  WebpackConfigTransformContext,
} from '@teambit/webpack';
import { container } from 'webpack';

const { ModuleFederationPlugin } = container;

const DEV = 'http://localhost:60000/';
const PROD = 'https://bit-mf-remote.netlify.app/';

export const remote = (
  configMutator: WebpackConfigMutator,
  context: WebpackConfigTransformContext,
  appEntry: string
): WebpackConfigMutator => {
  configMutator.addPlugin(
    new ModuleFederationPlugin({
      name: 'widgets',
      filename: 'remoteEntry.js',
      exposes: {
        './widgets': appEntry,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        '@personal-micro-front/mf-default-test.context.auth': {
          singleton: true,
          requiredVersion: '^0.0.1',
          eager: true,
        },
      },
    })
  );

  const mode = configMutator.raw.mode || 'production';

  configMutator.raw.output = configMutator.raw.output || {};
  configMutator.raw.output.publicPath = mode === 'development' ? DEV : PROD;

  return configMutator;
};
