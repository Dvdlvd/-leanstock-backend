import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import rateLimit
  from "express-rate-limit";

import "./jobs/decay.job.js";

import { env }
  from "./config/env.js";

import auditRoutes
  from "./modules/audit/audit.routes.js";

import authRoutes
  from "./modules/auth/auth.routes.js";

import productRoutes
  from "./modules/product/product.routes.js";

import locationRoutes
  from "./modules/location/location.routes.js";

import inventoryRoutes
  from "./modules/inventory/inventory.routes.js";

import { errorMiddleware }
  from "./middlewares/error.middleware.js";

const swaggerDocument =
  YAML.load("./openapi.yaml");

const app = express();


// RATE LIMIT
const limiter = rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 100,

  message:
    "Too many requests"

});


// MIDDLEWARES
app.use(limiter);

app.use(express.json());

app.use(cors({

  origin:
    "http://localhost:5173",

  credentials: true

}));


// SWAGGER
app.use(

  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(
    swaggerDocument
  )

);


// ROUTES
app.use(
  "/audit-logs",
  auditRoutes
);

app.use(
  "/auth",
  authRoutes
);

app.use(
  "/products",
  productRoutes
);

app.use(
  "/locations",
  locationRoutes
);

app.use(
  "/inventory",
  inventoryRoutes
);


// ERROR HANDLER
app.use(errorMiddleware);

export default app;