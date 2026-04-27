import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "./location.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);
router.get("/:id", getOne);

router.post("/", requireRole("MANAGER"), create);
router.put("/:id", requireRole("MANAGER"), update);
router.delete("/:id", requireRole("MANAGER"), remove);

export default router;