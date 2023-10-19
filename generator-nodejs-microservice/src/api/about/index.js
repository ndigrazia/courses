const { Router } = require("express");
const { info } = require('./controller');

const router = Router();

router.get('/', info);

module.exports = router;