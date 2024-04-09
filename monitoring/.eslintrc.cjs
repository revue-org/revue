/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node:true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // exclude dist directory
  ignorePatterns: ['dist/']
}
