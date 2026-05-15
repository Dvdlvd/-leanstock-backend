import cron from "node-cron";

import prisma from "../prisma/client.js";

cron.schedule(
  "* * * * *",
  async () => {

    console.log(
      "Dead stock job started"
    );

    const thirtyDaysAgo =
      new Date(
        Date.now()
        - 30 * 24 * 60 * 60 * 1000
      );

    const oldProducts =
      await prisma.product.findMany({

        where: {
          createdAt: {
            lt: thirtyDaysAgo
          }
        }

      });

    for (const product of oldProducts) {

      const newPrice =
        product.price * 0.9;

      await prisma.product.update({

        where: {
          id: product.id
        },

        data: {
          price: Number(
            newPrice.toFixed(2)
          )
        }

      });

      console.log(
        `Discount applied to ${product.name}`
      );

    }

  }
);