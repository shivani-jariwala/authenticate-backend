const nconf = require('nconf');
const path = require('path');

exports.initializeConfig = () => {
    // Initialize the default config first
    nconf.file('default', { file: path.join(__dirname, './default.json') });
    // switch (process.env.NODE_ENV) {
    switch (true) {
        case 'production':
            return nconf.file('environment', {
                file: path.join(__dirname, './production.json'),
            });
        // break;
        default:
            return nconf.file('environment', {
                file: path.join(__dirname, './staging.json'),
            });
        // break;
    }
};