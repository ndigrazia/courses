const { Router } = require("express");
const { info } = require('./controller');

const router = Router();

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/', info);

module.exports = router;