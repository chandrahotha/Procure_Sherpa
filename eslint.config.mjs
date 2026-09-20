/* ESLint flat config for Procure Sherpa.

   Two very different kinds of JavaScript live in this repo and they need
   opposite rules, so they get one config block each:

   1. src/**  - browser fragments that the build concatenates into ONE
      <script> block in a single HTML file. They are scripts, not modules;
      they share a single global scope and hand state to each other through
      the `PS` namespace. They are deliberately ES5 so the artifact runs in
      any browser that can open a local file, with no transpiler in the
      chain. `ecmaVersion: 5` is the enforcement of that promise: an `=>`
      or a `const` in src/ is now a build failure, not something a reviewer
      has to catch by eye.

   2. tools/**, build.mjs, validate.mjs - Node ESM build and test scripts.
      These never ship to a browser, so they get modern syntax. */

import js from '@eslint/js';

/* Globals the browser fragments legitimately share across file boundaries.
   Anything NOT in this list that is assigned at top level in src/ is a leak,
   and no-undef / no-implicit-globals will now say so. */
const PS_SHARED = {
  PS: 'writable',
  PS_KB: 'writable',
  PS_SOPS: 'writable',
  PS_CL: 'writable',
  PS_TPL: 'writable',
  PS_DEC: 'writable',
  PS_KPI: 'writable',
  PS_GLOSS: 'writable',
  PS_SCEN: 'writable',
  PS_CALC: 'writable',
  PS_HELP: 'writable'
};

const BROWSER = {
  window: 'readonly',
  document: 'readonly',
  console: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  navigator: 'readonly',
  location: 'readonly',
  history: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  Blob: 'readonly',
  URL: 'readonly',
  FileReader: 'readonly',
  Image: 'readonly',
  alert: 'readonly',
  confirm: 'readonly',
  btoa: 'readonly',
  atob: 'readonly',
  escape: 'readonly',
  unescape: 'readonly',
  matchMedia: 'readonly',
  getComputedStyle: 'readonly',
  CustomEvent: 'readonly',
  Event: 'readonly',
  Node: 'readonly',
  HTMLElement: 'readonly',
  performance: 'readonly',
  crypto: 'readonly',
  XMLSerializer: 'readonly',
  /* ES2015 runtime built-ins. ecmaVersion is 5 to police SYNTAX (no arrow
     functions, no const/let, no template literals), but these built-ins are
     available in every browser this artifact targets and are used
     deliberately - see src/core/03g_search.js and 06e3_copilot.js. */
  Set: 'readonly',
  Map: 'readonly',
  Promise: 'readonly'
};

export default [
  {
    ignores: [
      'node_modules/**',
      '.kilo/**',
      '_shot/**',
      'vercel_public/**',
      'dist/**',
      /* Generated release artifacts - linting them lints src/ twice,
         and the minified one is not meant to be readable. */
      '_check.js',
      'ProcureSherpa-v2.0.html'
    ]
  },

  /* ---- 1. Browser fragments: ES5, shared global scope ---- */
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      globals: { ...BROWSER, ...PS_SHARED }
    },
    rules: {
      ...js.configs.recommended.rules,

      /* The point of this whole block: nothing new may land in the
         shared global scope. Every fragment must hang its exports off
         PS. This is what caught `function flat()` in the search module. */
      'no-implicit-globals': 'error',
      'no-undef': 'error',

      /* The PS_* registries really are declared once in
         src/content/09a_data_init.js and listed as globals above so the
         other 150 fragments can see them; that declaration is correct,
         not a redeclaration. Shadowing between fragments is still an
         error. */
      'no-redeclare': ['error', { builtinGlobals: false }],

      /* `catch (e) { }` is a deliberate, documented pattern here: storage,
         clipboard and download APIs are all optional and the app degrades
         instead of failing. Empty blocks anywhere else stay an error. */
      'no-empty': ['error', { allowEmptyCatch: true }],

      /* Correctness rules that matter in a codebase with no types. */
      eqeqeq: ['error', 'smart'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-return-assign': 'error',
      'no-unused-expressions': 'error',
      'no-shadow-restricted-names': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'array-callback-return': 'error',
      'consistent-return': 'off',
      'no-var': 'off',
      'prefer-const': 'off',

      /* Unused args are common in event-handler signatures; unused
         locals are not, and are usually a real mistake. */
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  },

  /* ---- 2. Node ESM build and test scripts ---- */
  {
    files: ['tools/**/*.mjs', 'build.mjs', 'validate.mjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        URL: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: ['error', 'smart'],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  }
];
