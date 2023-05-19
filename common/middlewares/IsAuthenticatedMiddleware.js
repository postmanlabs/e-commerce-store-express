const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const ERROR_MESSAGES = {
  NO_AUTH_HEADER: "Auth headers not provided in the request.",
  INVALID_MECHANISM: "Invalid auth mechanism.",
  MISSING_TOKEN: "Bearer token missing in the authorization headers.",
  INVALID_TOKEN: "Invalid access token provided, please login again.",
};

function sendError(res, message, status) {
  return res.status(status).json({
    status: false,
    error: { message },
  });
}

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // IF no auth headers are provided
    // THEN return 401 Unauthorized error

    if (!authHeader) {
      return sendError(res, ERROR_MESSAGES.NO_AUTH_HEADER, 401);
    }
    // IF bearer auth header is not provided
    // THEN return 401 Unauthorized error

    if (!authHeader.startsWith("Bearer")) {
      return sendError(res, ERROR_MESSAGES.INVALID_MECHANISM, 401);
    }

    const token = authHeader.split(" ")[1];

    // IF bearer auth header is provided, but token is not provided
    // THEN return 401 Unauthorized error

    if (!token) {
      return sendError(res, ERROR_MESSAGES.MISSING_TOKEN, 401);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return sendError(res, ERROR_MESSAGES.INVALID_TOKEN, 401);
        }
        return sendError(res, ERROR_MESSAGES.INVALID_TOKEN, 403);
      }

      req.user = user; // Save the user object for further use
      next();
    });
  },
};
