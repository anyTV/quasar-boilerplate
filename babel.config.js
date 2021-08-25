'use strict';

module.exports = {
    'presets': [
        [
            '@quasar/babel-preset-app'
        ],
        [
            '@babel/preset-env',
            {
                'corejs': '3',
                'modules': false,
                'loose': false,
                'useBuiltIns': 'entry'
            }
        ],
    ],
    'comments': false
}
