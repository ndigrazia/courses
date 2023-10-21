const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const config = require('../config');

const requestLogger = (env) => {
    return env === 'production' ? morgan('common') : morgan('dev');
};

module.exports = (apiRoot, routes) => {
    const app = express();

    const env = config.env;
    
    if (env === 'production' || env === 'development') {
        //To do commons activities
    }

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(requestLogger(env));

    app.use(apiRoot, routes);

    return app;
}

