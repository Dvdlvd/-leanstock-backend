import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { env } from "./config/env.js";

import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import locationRoutes from "./modules/location/location.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();

app.use(express.json());

app.use(cors({
  origin: env.corsOrigin
}));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/auth", authRoutes);

app.use("/products", productRoutes);

app.use("/locations", locationRoutes);

app.use("/inventory", inventoryRoutes);

app.use(errorMiddleware);

export default app;