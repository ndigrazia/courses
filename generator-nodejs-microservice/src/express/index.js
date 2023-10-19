const express = require("express");
const bodyParser = require("body-parser")

const config = require('../config');

module.exports = (apiRoot, routes) => {
    const app = express();

    const env = config.env;
  
    if (env === 'production' || env === 'development') {
    }

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(apiRoot, routes);

    return app;
}

