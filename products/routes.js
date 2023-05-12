const router = require("express").Router();

// Controller Imports
const ProductController = require("./controllers/ProductController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createProductPayload = require("./schemas/createProductPayload");
const updateProductPayload = require("./schemas/updateProductPayload");
const { roles } = require("../config");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  ProductController.getAllProducts
);

router.get(
  "/:productId",
  [isAuthenticatedMiddleware.check],
  ProductController.getProductById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(createProductPayload),
  ],
  ProductController.createProduct
);

router.patch(
  "/:productId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateProductPayload),
  ],
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ProductController.deleteProduct
);

module.exports = router;
