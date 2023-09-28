import { ReactPreview } from '@teambit/preview.react-preview';
import { EnvHandler } from '@teambit/envs';
import { Preview } from '@teambit/preview';
import MfEnv from '@learnbit/module-federation.mf-react-env';
import { tailwindTransformer } from '@learnbit/styling.transformers.tailwind';
import { WebpackConfigMutator } from '@teambit/webpack';
import webpack from 'webpack';

export class HostEnv extends MfEnv {
  name = 'host-mf-env';

  icon = 'https://static.bit.dev/extensions-icons/react.svg';

  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      transformers: [
        tailwindTransformer({}),
        (config: WebpackConfigMutator) => {
          config.merge({
            externals: 'auth',
          });
          config.addPlugin(
            new webpack.IgnorePlugin({
              resourceRegExp: /^auth\/auth$/, // the regular expression to match the resource
              contextRegExp: /.*/, // the regular expression to match the context (issuer)
            })
          );
          return config;
        },
      ],
    });
  }
}

export default new HostEnv();
