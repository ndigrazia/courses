const http = require("http");

const config = require('./config');
const express = require("./express");
const router = require("./api");

const app = express(config.apiRoot, router);

const server = http.createServer(app);

const port = config.port;
const ip = config.ip;

setImmediate(() => {
    server.listen(port, ip, () => {
      console.log(`Server running at ${ip}:${port}`);
    })
});
