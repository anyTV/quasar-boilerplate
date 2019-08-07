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
                'useBuiltIns': 'usage'
            }
        ],
    ],
    'comments': false
}
