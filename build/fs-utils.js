const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-es');


function loadMinified(filePath, bindings) {
    let code = fs.readFileSync(filePath, 'utf-8');

    if (_.isPlainObject(bindings) && !_.isEmpty(bindings)) {
        code = _.reduce(bindings, (result, value, key) => {
            return _.replace(result, new RegExp(`{{\\s*${key}\\s*}}`), value);
        }, code);
    }

    const result = UglifyJS.minify(code);

    if (result.error) {
        return '';
    }

    return result.code;
}

function loadAvailableLanguages(source) {
    if (!fs.statSync(source).isDirectory()) {
        throw new Error('source must be a directory');
    }

    return _.filter(
        fs.readdirSync(source),
        dir => fs.statSync(path.join(source, dir)).isDirectory()
    );
}

function loadTranslationResources(source) {
    /**
     * get language directories
     * should follow the format
     * dir/
     * |_ en
     * |___index.<js|json>
     * |_ de
     * |___index.<js|json>
     * ...
     */
    const languageDirs = loadAvailableLanguages(source);
    /**
     * construct i18next resource map
     * e.g.
     * resources: {
         *   en: {
         *     namespace1: {
         *       key: 'hello from namespace 1'
         *     },
         *     namespace2: {
         *       key: 'hello from namespace 2'
         *     }
         *   },
         * }
     */
    return _.transform(languageDirs, (resource, dir) => {
        const namespaces = _.filter(
            fs.readdirSync(path.join(source, dir)),
            file => /^\.(js|json)$/.test(path.extname(file))
        );

        resource[dir] = _.transform(namespaces, (namespace, file) => {
            namespace[_.replace(file, path.extname(file), '')] = require(path.join(source, dir, file));
        });
    }, {});
}

module.exports = {
    loadMinified,
    loadAvailableLanguages,
    loadTranslationResources,
};
