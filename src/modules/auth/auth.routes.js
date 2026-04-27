import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout
} from "./auth.controller.js";

import rateLimit from "express-rate-limit";

const router = Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5
});

router.post("/register", limiter, register);
router.post("/login", limiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;