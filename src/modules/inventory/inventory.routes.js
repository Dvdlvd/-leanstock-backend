import { Router } from "express";
import { transfer } from "./inventory.controller.js";

import { authMiddleware }
  from "../../middlewares/auth.middleware.js";

import { requireRole }
  from "../../middlewares/rbac.middleware.js";

const router = Router();

router.post(
  "/transfer",
  authMiddleware,
  requireRole("MANAGER"),
  transfer
);

export default router;