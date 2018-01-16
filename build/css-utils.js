const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const purify = require('purify-css');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports.postcss = [autoprefixer()];

module.exports.styleLoaders = function (options) {
    options = options || {};

    function generateLoaders(loaders) {
        if (options.postcss) {
            loaders.splice(1, 0, 'postcss');
        }

        const sourceLoader = loaders.map(function (loader) {
            let extraParamChar;
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            }
            else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
        }).join('!');

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: sourceLoader,
                fallback: 'vue-style-loader'
            });
        }
        else {
            return ['vue-style-loader', sourceLoader].join('!');
        }
    }

    return {
        css: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        styl: generateLoaders(['css', 'stylus']),
        stylus: generateLoaders(['css', 'stylus'])
    };
};

module.exports.styleRules = function (options) {
    var output = [];
    var loaders = exports.styleLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        });
    }
    return output;
};

function getSize(size) {
    return (size / 1024).toFixed(2) + 'kb';
}

module.exports.purify = function (cb) {
    const css = glob.sync(path.join(__dirname, '../dist/**/*.css'));
    const js = glob.sync(path.join(__dirname, '../dist/**/*.js'));

    Promise.all(css.map(function (file) {
            return new Promise(function (resolve) {
                console.log('\n Purifying ' + path.relative(path.join(__dirname, '../dist'), file).bold + '...');
                purify(js, [file], { minify: true }, function (purified) {
                    const oldSize = fs.statSync(file).size;
                    fs.writeFileSync(file, purified);
                    const newSize = fs.statSync(file).size;

                    console.log(
                        ' * Reduced size by ' + ((1 - newSize / oldSize) * 100).toFixed(2) + '%, from ' +
                        getSize(oldSize) + ' to ' + getSize(newSize) + '.'
                    );
                    resolve();
                });
            });
        }))
        .then(cb);
};
