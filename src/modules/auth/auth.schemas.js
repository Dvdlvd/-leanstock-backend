import { z } from "zod";

export const registerSchema = z.object({

  email:
    z.string().email(),

  password:
    z.string().min(8),

  role:
    z.enum([
      "ADMIN",
      "MANAGER",
      "VIEWER"
    ])

});

export const loginSchema = z.object({

  email:
    z.string().email(),

  password:
    z.string().min(8)

});

export const forgotPasswordSchema =
  z.object({

    email:
      z.string().email()

  });

export const resetPasswordSchema =
  z.object({

    password:
      z.string().min(8)

  });