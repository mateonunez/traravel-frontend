module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier', 'vue'],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'prettier/prettier': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'comma-dangle': ['error', 'never'],
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-indent': 0,
    'vue/no-v-html': 0,
    'vue/valid-v-slot': 0
  }
}
