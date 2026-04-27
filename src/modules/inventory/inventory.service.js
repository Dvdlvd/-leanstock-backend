import prisma from "../../prisma/client.js";
import { AppError } from "../../utils/errors.js";

export const transferInventory = async (
  data,
  tenantId
) => {
  const { productId, fromLocationId, toLocationId, quantity } = data;

  return await prisma.$transaction(async (tx) => {
    // check product belongs to tenant
    const product = await tx.product.findFirst({
      where: { id: productId, tenantId }
    });

    if (!product) throw new AppError("Invalid product", 404);

    // source
    const source = await tx.inventory.findUnique({
      where: {
        productId_locationId: {
          productId,
          locationId: fromLocationId
        }
      }
    });

    if (!source || source.quantity < quantity) {
      throw new AppError("Not enough stock", 400);
    }

    // destination
    const destination = await tx.inventory.findUnique({
      where: {
        productId_locationId: {
          productId,
          locationId: toLocationId
        }
      }
    });

    // decrease source
    await tx.inventory.update({
      where: { id: source.id },
      data: { quantity: source.quantity - quantity }
    });

    // increase destination
    if (destination) {
      await tx.inventory.update({
        where: { id: destination.id },
        data: { quantity: destination.quantity + quantity }
      });
    } else {
      await tx.inventory.create({
        data: {
          productId,
          locationId: toLocationId,
          quantity
        }
      });
    }

    return { message: "Transfer successful" };
  });
};