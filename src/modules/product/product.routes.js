import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getOne,
  update,
  remove
} from "./product.controller.js";

import {
  authMiddleware
} from "../../middlewares/auth.middleware.js";

import {
  requireRole
} from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(authMiddleware);


// GET ALL
router.get(
  "/",
  getAllProducts
);


// GET ONE
router.get(
  "/:id",
  getOne
);


// CREATE
router.post(
  "/",
  requireRole("ADMIN", "MANAGER"),
  createProduct
);


// UPDATE
router.put(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  update
);


// DELETE
router.delete(
  "/:id",
  requireRole("ADMIN"),
  remove
);

export default router;