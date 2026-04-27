import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import productRoutes from "./modules/product/product.routes.js";
import locationRoutes from "./modules/location/location.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDoc = YAML.load("./swagger.yaml");

const app = express();

app.use(express.json());

app.use(cors({
  origin: env.corsOrigin
}));

app.use("/auth", authRoutes);

// global error handler
app.use(errorMiddleware);

app.use("/products", productRoutes);

app.use("/locations", locationRoutes);

app.use("/inventory", inventoryRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;