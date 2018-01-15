const shell = require('shelljs');
const path = require('path');

shell.rm('-rf', path.resolve(__dirname, '../dist/*'));
shell.rm('-rf', path.resolve(__dirname, '../dist/.*'));
console.log(' Cleaned build artifacts.\n');
