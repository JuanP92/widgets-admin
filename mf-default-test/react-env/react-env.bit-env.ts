import { Compiler } from '@teambit/compiler';
import { StarterList, TemplateList } from '@teambit/generator';
import { ReactAppTemplate, ReactComponentTemplate, ReactContextTemplate, ReactEnvTemplate, ReactHookTemplate, ReactJSComponentTemplate } from '@teambit/react.generator.react-templates';
import { ReactWorkspaceStarter } from '@teambit/react.generator.react-starters';
import { ReactAppType } from '@teambit/react.apps.react-app-types';
import { TypeScriptExtractor } from '@teambit/typescript';
import { ReactPreview } from '@teambit/preview.react-preview';
import { EnvHandler } from '@teambit/envs';
import {
  TypescriptCompiler,
  // resolveTypes,
  TypescriptTask,
  TypescriptConfigWriter,
  resolveTypes
} from '@teambit/typescript.typescript-compiler';
import { ESLintLinter, EslintConfigWriter, EslintTask } from '@teambit/defender.eslint-linter';
import { ESLint as ESLintLib } from 'eslint';
import { AppTypeList } from '@teambit/application';
import { JestTask, JestTester } from '@teambit/defender.jest-tester';
import { PrettierConfigWriter, PrettierFormatter } from '@teambit/defender.prettier-formatter';
import typescript from 'typescript';
import { Tester } from '@teambit/tester';
import { Pipeline, CAPSULE_ARTIFACTS_DIR } from '@teambit/builder';
import { Preview } from '@teambit/preview';
import { SchemaExtractor } from '@teambit/schema';
import { ConfigWriterList } from '@teambit/workspace-config-files';
import { PackageGenerator } from '@teambit/pkg';
import { ReactEnvInterface } from './react-env-interface';
// import webpackTransformer from './config/webpack.config';

export class ReactEnv implements ReactEnvInterface {
  [key: string]: any;

  /**
   * name of the environment. used for friendly mentions across bit.
   */
  name = 'react';

  /**
   * icon for the env. use this to build a more friendly env.
   * uses react by default.
   */
  icon = 'https://static.bit.dev/extensions-icons/react.svg';

  protected tsconfigPath = require.resolve('./config/tsconfig.json');
  
  protected tsTypesPath = './types';

  protected jestConfigPath = require.resolve('./config/jest.config');

  protected eslintConfigPath = require.resolve('./config/eslintrc.js');
  
  protected eslintExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

  protected prettierConfigPath = require.resolve('./config/prettier.config.js');
  
  protected prettierExtensions = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.mjs',
    '.cjs',
    '.json',
    '.css',
    '.scss',
    '.md',
    '.mdx',
    '.html',
    '.yml',
    '.yaml',
  ];

  protected previewMounter = require.resolve('./preview/mounter');
  
  protected previewDocsTemplate = require.resolve('./preview/docs');

  /**
   * Default npm ignore paths.
   * Will ignore the "artifacts" directory by default.
   */
  npmIgnore = [`${CAPSULE_ARTIFACTS_DIR}/`];

  /**
   * Default host dependencies for the react preview.
   */
  hostDependencies = ReactPreview.hostDependencies;

  /**
   * Default package.json modifications.
   */
  packageJson = {
    main: 'dist/{main}.js',
    types: '{main}.ts',
    // type: 'module',
  };

  /**
   * return an instance of a Compiler. use components like typescript-compiler (teambit.typescript/typescript-compiler)
   * or our babel-compiler (teambit.compilation/babel-compiler).
   */
  // TODO: make sure we only run compiler once @david.
  compiler(): EnvHandler<Compiler> {
    // const babelConfig = this.react.getBabelDefaultConfig();
    // const babelCompiler = new BabelCompiler(babelConfig);
    return TypescriptCompiler.from({
      tsconfig: this.tsconfigPath,
      // types: resolveTypes(__dirname, [this.tsTypesPath]),
      typescript,
    });
  }

  /**
   * returns an instance of a Bit tester implementation. use components like mocha-tester or
   * jest-tester or [build your own](https://bit.dev/docs/tester/implement-tester).
   */
  tester(): EnvHandler<Tester> {
    // TODO @gilad: check jest tester on watch.
    // TODO: upgrade to jest 29.
    return JestTester.from({
      jest: require.resolve('jest'),
      config: this.jestConfigPath
    });
  }

  /**
   * return an instance of a Bit preview instance. used for preview purposes.
   * base preview is a general purpose webpack preview.
   */
  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      /**
       * override the default docs template for components.
       */
      // docsTemplate: this.previewDocsTemplate,
      /**
       * mounters are used to mount components to DOM
       * during preview. use them for wrapping your components
       * with routing, theming, data fetching or other types
       * of providers.
       */
      mounter: this.previewMounter
      // transformers: [webpackTransformer],
      // webpackModulePath: require.resolve("webpack"),
      // webpackDevServerModulePath: require.resolve("webpack-dev-server")
    });
  }

  /**
   * returns an instance of the default TypeScript extractor.
   * used by default for type inference for both JS and TS.
   */
  schemaExtractor(): EnvHandler<SchemaExtractor> {
    return TypeScriptExtractor.from({
      tsconfig: this.tsconfigPath
    });
  }

  /**
   * returns an instance of the default ESLint.
   * config files would be used to validate coding standards in components.
   * bit will write the minimum required files in any workspace to optimize
   * for dev experience.
   */
  linter() {
    return ESLintLinter.from({
      tsconfig: this.tsconfigPath,
      eslint: ESLintLib,
      configPath: this.eslintConfigPath,
      // resolve all plugins from the react environment.
      pluginsPath: __dirname,
      extensions: this.eslintExtensions
    });
  }

  /**
   * used by bit's formatter. helps to standardize and automate
   * code styling. can be used a build task or using bit lint and common
   * ides.
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: this.prettierConfigPath
    });
  }

  /**
   * define the build pipeline for a component.
   * pipelines are optimized for performance and consistency.
   * making sure every component is independently built and tested.
   */
  build() {
    // :TODO fix build task
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: this.tsconfigPath,
        // types: resolveTypes(__dirname, ["./types"]),
        typescript,
      }),
      EslintTask.from({
        tsconfig: this.tsconfigPath,
        eslint: ESLintLib,
        configPath: this.eslintConfigPath,
        // resolve all plugins from the react environment.
        pluginsPath: __dirname,
        extensions: this.eslintExtensions
      }),
      JestTask.from({
        config: this.jestConfigPath,
        jest: require.resolve('jest'),
      }),
    ]);
  }

  /**
   * add build tasks to execute upon [snap](https://bit.dev/docs/snaps).
   * use the snap pipeline for staging and test deployments
   */
  snap() {
    return Pipeline.from([]);
  }

  /**
   * add build tasks to execute upon [tag](https://bit.dev/docs/tags).
   * use the tag pipeline for deployments, or other tasks required for
   * publishing a semantic version for a component.
   */
  tag() {
    return Pipeline.from([]);
  }

  workspaceConfig(): ConfigWriterList {
    return ConfigWriterList.from([
      TypescriptConfigWriter.from({
        tsconfig: this.tsconfigPath
        // types: resolveTypes(__dirname, [this.tsTypesPath]),
      }),
      EslintConfigWriter.from({
        configPath: this.eslintConfigPath,
        tsconfig: this.tsconfigPath
      }),
      PrettierConfigWriter.from({
        configPath: this.prettierConfigPath
      })
    ]);
  }

  /**
   * a list of starters for new projects. this helps create a quick and
   * standardized
   */
  starters() {
    return StarterList.from([ReactWorkspaceStarter.from()]);
  }

  /**
   * set a list of component templates to use across your
   * workspaces. new workspaces would be set to include
   * your envs by default.
   */
  generators() {
    return TemplateList.from([
      ReactComponentTemplate.from(),
      ReactHookTemplate.from(),
      ReactContextTemplate.from(),
      ReactAppTemplate.from(),
      ReactJSComponentTemplate.from(),
      ReactEnvTemplate.from(),
    ]);
  }

  apps(): EnvHandler<AppTypeList> {
    return AppTypeList.from([ReactAppType.from()]);
  }

  /**
   * configure and control the packaging process of components.
   */
  package() {
    return PackageGenerator.from({
      packageJson: this.packageJson,
      npmIgnore: this.npmIgnore,
    });
  }
}

export default new ReactEnv();
