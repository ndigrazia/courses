const { Router } = require("express");

const router = new Router()

router.use('/about', require("./about"));

module.exports = router;