const router = require("express").Router();
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const UserController = require("./controllers/UserController");
const updateUserPayload = require("./schemas/updateUserPayload");

router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);
router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateUserPayload),
  ],
  UserController.updateUser
);

module.exports = router;
