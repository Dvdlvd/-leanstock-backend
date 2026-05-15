import prisma from "../../prisma/client.js";

import { AppError }
  from "../../utils/errors.js";


// CREATE INVENTORY
export const createInventory = async (
  req,
  res,
  next
) => {

  try {

    const {
      productId,
      locationId,
      quantity
    } = req.body;

    const existing =
      await prisma.inventory.findFirst({

        where: {
          productId,
          locationId
        }

      });

    if (existing) {

      throw new AppError(
        "Inventory already exists",
        409
      );

    }

    const inventory =
      await prisma.inventory.create({

        data: {
          productId,
          locationId,
          quantity
        }

      });

    res.json(inventory);

  } catch (error) {

    next(error);

  }

};


// TRANSFER INVENTORY
export const transfer = async (
  req,
  res,
  next
) => {

  try {

    const {
      productId,
      fromLocationId,
      toLocationId,
      quantity
    } = req.body;

    await prisma.$transaction(
      async (tx) => {

        const fromInventory =
          await tx.inventory.findFirst({

            where: {
              productId,
              locationId:
                fromLocationId
            }

          });

        if (
          !fromInventory ||
          fromInventory.quantity < quantity
        ) {

          throw new AppError(
            "Not enough stock",
            400
          );

        }

        await tx.inventory.update({

          where: {
            id: fromInventory.id
          },

          data: {

            quantity: {
              decrement: quantity
            }

          }

        });

        const toInventory =
          await tx.inventory.findFirst({

            where: {
              productId,
              locationId:
                toLocationId
            }

          });

        if (toInventory) {

          await tx.inventory.update({

            where: {
              id: toInventory.id
            },

            data: {

              quantity: {
                increment: quantity
              }

            }

          });

        } else {

          await tx.inventory.create({

            data: {
              productId,
              locationId:
                toLocationId,
              quantity
            }

          });

        }

      }
    );

    res.json({
      message:
        "Transfer successful"
    });

  } catch (error) {

    next(error);

  }

};