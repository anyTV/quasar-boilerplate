module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
        'eslint:recommended',
        // https://github.com/vuejs/eslint-plugin-vue#gear-configs
        'plugin:vue/base',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'import',
    ],
    globals: {
        'ga': true, // Google Analytics
        'cordova': true,
        '__statics': true,
        'process': true,
    },
    // add your custom rules here
    'rules': {
        // allow async-await
        'generator-star-spacing': 'off',

        // allow paren-less arrow functions
        'arrow-parens': 'off',
        'one-var': 'off',

        'import/first': 'off',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',

        // allow console and debugger during development
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }]
    }
};
