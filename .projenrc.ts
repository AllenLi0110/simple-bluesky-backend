import { typescript } from 'projen';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'simple-chirpstack-backend',
  projenrcTs: true,
  // deps: [],                /* Runtime dependencies of this module. */
  deps: [
    // API & Server
    'express',
    '@types/express',
  ],
  // devDeps: [],             /* Build dependencies for this module. */
  devDeps: [
    // Type definitions
    '@types/express',
    '@types/jest',

    // Build tools
    'esbuild',

    // Testing
    'jest',
    'ts-jest',

    // Development utilities
    'nodemon',
    'prettier',
  ],
  jest: true,
  sampleCode: false,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.addTask('dev', {
  exec: 'node esbuild.mjs && node dist/index.js',
});
project.synth();
