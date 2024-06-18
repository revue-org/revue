require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    'node': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
  },
  // exclude dist directory
  ignorePatterns: ['dist/']
}
