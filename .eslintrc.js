module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',

  },
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "vue/no-unused-components": "off",
    "eslint-disable-next-line": "off",
    "max-len" :["error",{code:300}],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
    }],
  },
}
