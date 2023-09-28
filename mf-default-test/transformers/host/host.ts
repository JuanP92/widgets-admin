import type { WebpackConfigTransformer } from '@teambit/webpack';
import { container } from 'webpack';

const { ModuleFederationPlugin } = container;

export const host: WebpackConfigTransformer = (config) => {
  config.addPlugin(
    new ModuleFederationPlugin({
      remotes: {
        widgets: 'widgets@http://localhost:60000/remoteEntry.js',
      },
      shared: [
        {
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
      ],
    })
  );
  return config;
};
