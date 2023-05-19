import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Sequelize } from "sequelize";

import { port, databaseFilePath } from "./config.js";
// Express Routes Import
import AuthorizationRoutes from "./authorization/routes.js";
import UserRoutes from "./users/routes.js";
import ProductRoutes from "./products/routes.js";
// Sequelize model imports
import UserModel from "./common/models/User.js";
import ProductModel from "./common/models/Product.js";

const app = express();
const PORT = process.env.PORT || port;

app.use(morgan("tiny"));
app.use(cors());
// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databaseFilePath, // Path to the file that will store the SQLite DB.
});

const initializeModels = async () => {
  // Initialising the Model on sequelize
  await UserModel.initialize(sequelize);
  await ProductModel.initialize(sequelize);
};

const initializeRoutes = () => {
  // Intialising the routes
  app.use("/", AuthorizationRoutes);
  app.use("/user", UserRoutes);
  app.use("/product", ProductRoutes);
};

// server initilization
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
};
// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize initialized!");
    // Attaching the Model and User Routes to the app.
    initializeModels();
    initializeRoutes();
    startServer();
  })
  .catch((err) => {
    console.error("Sequelize initialization error:", err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("UnhandledRejection error:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("UncaughtException error:", err);
  process.exit(1);
});
