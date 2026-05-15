import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getOne,
  update,
  remove,
  reserve
} from "./product.controller.js";

import { authMiddleware }
  from "../../middlewares/auth.middleware.js";

import { requireRole }
  from "../../middlewares/rbac.middleware.js";

const router = Router();


// GET ALL
router.get(
  "/",
  authMiddleware,
  getAllProducts
);


// GET ONE
router.get(
  "/:id",
  authMiddleware,
  getOne
);


// CREATE
router.post(
  "/",
  authMiddleware,
  requireRole(
    "ADMIN",
    "MANAGER"
  ),
  createProduct
);


// UPDATE
router.put(
  "/:id",
  authMiddleware,
  requireRole(
    "ADMIN",
    "MANAGER"
  ),
  update
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  remove
);


// RESERVE PRODUCT
router.post(
  "/:id/reserve",
  authMiddleware,
  reserve
);

export default router;