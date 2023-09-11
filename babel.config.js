'use strict';

module.exports = {
    'presets': [
        [
            '@quasar/babel-preset-app'
        ],
        [
            '@babel/preset-env',
            {
                'modules': false,
                'loose': false,
                'useBuiltIns': 'usage',
                'corejs': '^3.6.5'
            }
        ],
    ],
    'comments': false
}
