module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },

  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],

  rules: {
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
  },
}
