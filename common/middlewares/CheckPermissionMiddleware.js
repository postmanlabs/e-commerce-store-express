const UserModel = require("../models/User");

module.exports = {
  // Middleware function that checks if the user has the required role.
  has: (role) => {
    return async (req, res, next) => {
      try {
        const { userId } = req.user;

        // Find the user in the database.
        const user = await UserModel.findUser({ id: userId });

        // If the user does not exist in our database, return an error and ask them to login again.
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid access token provided. Please log in again.",
          });
        }

        const userRole = user.role;

        // If the user does not possess the required role, return an error.
        if (userRole !== role) {
          return res.status(403).json({
            success: false,
            message: `You need to be a ${role} to access this endpoint.`,
          });
        }

        // Otherwise, continue to the next middleware.
        next();
      } catch (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    };
  },
};
