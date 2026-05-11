import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getOne,
  update,
  remove
} from "./product.controller.js";

import { authMiddleware }
  from "../../middlewares/auth.middleware.js";

import { requireRole }
  from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  getAllProducts
);

router.get(
  "/:id",
  getOne
);

router.post(
  "/",
  requireRole("ADMIN", "MANAGER"),
  createProduct
);

router.put(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  update
);

router.delete(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  remove
);

export default router;