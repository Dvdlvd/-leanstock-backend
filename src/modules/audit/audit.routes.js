import { Router } from "express";

import prisma from "../../prisma/client.js";

import { authMiddleware }
  from "../../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    const logs =
      await prisma.auditLog.findMany({

        orderBy: {
          createdAt: "desc"
        },

        take: 50

      });

    res.json(logs);

  }
);

export default router;