/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // exclude dist directory
  ignorePatterns: ['dist/']
}
