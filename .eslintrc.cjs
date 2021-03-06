/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.spec.{js,ts,jsx,tsx}',
        'cypress/integration/**.spec.{js,ts,jsx,tsx}',
      ],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-var': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    semi: ['error', 'never'],
  },
}
