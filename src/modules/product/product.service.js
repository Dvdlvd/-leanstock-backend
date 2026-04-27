import prisma from "../../prisma/client.js";
import { AppError } from "../../utils/errors.js";

export const createProduct = async (data, tenantId) => {
  return await prisma.product.create({
    data: {
      ...data,
      tenantId
    }
  });
};

export const getProducts = async (tenantId) => {
  return await prisma.product.findMany({
    where: { tenantId }
  });
};

export const getProductById = async (id, tenantId) => {
  const product = await prisma.product.findFirst({
    where: { id, tenantId }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const updateProduct = async (id, data, tenantId) => {
  await getProductById(id, tenantId);

  return await prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id, tenantId) => {
  await getProductById(id, tenantId);

  return await prisma.product.delete({
    where: { id }
  });
};