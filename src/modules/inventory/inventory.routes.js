// src/modules/inventory/inventory.routes.js

import { Router } from "express";

import {
  createInventory,
  transferInventory,
  getInventoryByLocation
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


// GET INVENTORY BY LOCATION
router.get(
  "/location/:locationId",
  authMiddleware,
  getInventoryByLocation
);


// TRANSFER INVENTORY
router.post(
  "/transfer",
  authMiddleware,
  requireRole(
    "ADMIN",
    "MANAGER"
  ),
  transferInventory
);

export default router;