import prisma from "../prisma/client.js";

export const runDecayJob = async () => {
  const products = await prisma.product.findMany();

  for (const product of products) {
    if (product.price > 50) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          price: product.price * 0.9
        }
      });
    }
  }

  console.log("Decay job executed");
};