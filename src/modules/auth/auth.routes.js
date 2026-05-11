import { Router } from "express";

import {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  changePassword
} from "./auth.controller.js";

import { validate }
  from "../../middlewares/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from "./auth.schemas.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/refresh",
  refresh
);

router.post(
  "/logout",
  logout
);

router.get(
  "/verify/:token",
  verifyEmail
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/reset/:token",
  validate(resetPasswordSchema),
  changePassword
);

export default router;