const router = require('express').Router();
const AuthorizationController = require('./controllers/AuthorizationController');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');

// Payload Schemas START
const registerPayload = require('./schemas/registerPayload');
const loginPayload = require('./schemas/loginPayload');
// Payload Schemas END

router.post('/signup', [
  SchemaValidationMiddleware.verify(registerPayload)
], AuthorizationController.register)

router.post('/login', [
  SchemaValidationMiddleware.verify(loginPayload)
], AuthorizationController.login)

module.exports = router;
