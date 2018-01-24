module.exports = {
    source: './src',
    destination: './docs',
    plugins: [
        {
            name: 'esdoc-standard-plugin',
            option: {
                lint: { enable: true },
                coverage: { enable: true },
                test: {
                    source: './test/unit/specs',
                    interfaces: ['describe', 'it', 'context', 'suite', 'test'],
                    includes: ['(spec|Spec|test|Test)\\.js$'],
                    excludes: ['\\.config\\.js$']
                },
            }
        }
    ]
};
