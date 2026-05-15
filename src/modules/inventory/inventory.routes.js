import { Router } from "express";

import {
  createInventory,
  transfer
} from "./inventory.controller.js";

import { authMiddleware }
  from "../../middlewares/auth.middleware.js";

import { requireRole }
  from "../../middlewares/rbac.middleware.js";

const router = Router();


// CREATE INVENTORY
router.post(
  "/",
  authMiddleware,
  requireRole(
    "ADMIN",
    "MANAGER"
  ),
  createInventory
);


// TRANSFER
router.post(
  "/transfer",
  authMiddleware,
  requireRole(
    "ADMIN",
    "MANAGER"
  ),
  transfer
);

export default router;