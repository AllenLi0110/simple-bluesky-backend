import { typescript } from 'projen';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'simple-bluesky-backend',
  projenrcTs: true,
  // deps: [],                /* Runtime dependencies of this module. */
  deps: [
    // API & Server
    'express',
    '@types/express',
    'joi',
    '@atproto/api',
    '@atproto/oauth-client-node',
    'dotenv',
    // Queue
    'amqplib',
  ],
  // devDeps: [],             /* Build dependencies for this module. */
  devDeps: [
    // Type definitions
    '@types/express',
    '@types/jest',
    '@types/amqplib',

    // Build tools
    'esbuild',

    // Testing
    'jest',
    'ts-jest',

    // API Documentation
    'apidoc',

    // Development utilities
    'nodemon',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'eslint-import-resolver-typescript',
  ],
  jest: true,
  jestOptions: {
    jestConfig: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      testEnvironment: 'node',
    },
  },
  sampleCode: false,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
  tsconfig: {
    compilerOptions: {
      baseUrl: 'src',
      paths: {
        '@/*': ['*'],
      },
      lib: ['es2019', 'dom'],
      // @TODO: Temporary workaround for type errors in third-party dependencies (@atproto/xrpc and multiformats).
      // Remove when these packages fix their TypeScript declarations.
      skipLibCheck: true,
    },
  },
});
project.addTask('dev', {
  exec: 'node esbuild.mjs && node dist/index.js',
});
project.synth();
