const path = require('path')

const config = {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 9000,
    apiRoot: process.env.API_ROOT || '<%= apiRoot %>'
}

module.exports = config;
