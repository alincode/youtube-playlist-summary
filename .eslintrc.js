module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier/standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': ['off', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'require-atomic-updates': ['off'],
    'no-param-reassign': 'error',
  },
}
