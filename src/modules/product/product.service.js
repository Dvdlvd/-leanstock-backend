import prisma from "../../prisma/client.js";

import { AppError }
  from "../../utils/errors.js";


// CREATE PRODUCT
export const createProduct = async (
  data,
  tenantId
) => {

  const existing =
    await prisma.product.findUnique({
      where: {
        sku: data.sku
      }
    });

  if (existing) {
    throw new AppError(
      "SKU already exists",
      409
    );
  }

  const lowStock =
    data.quantity < 5;

  return prisma.product.create({
    data: {
      ...data,
      lowStock,
      tenantId
    }
  });

};


// GET PRODUCTS
export const getProducts = async ({
  tenantId,
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  order = "desc"
}) => {

  const skip =
    (Number(page) - 1)
    * Number(limit);

  const products =
    await prisma.product.findMany({

      where: {
        tenantId,

        name: {
          contains: search,
          mode: "insensitive"
        }
      },

      orderBy: {
        [sortBy]: order
      },

      skip,

      take: Number(limit)
    });

  const total =
    await prisma.product.count({

      where: {
        tenantId,

        name: {
          contains: search,
          mode: "insensitive"
        }
      }
    });

  return {

    data: products,

    meta: {

      total,

      page: Number(page),

      limit: Number(limit),

      totalPages:
        Math.ceil(total / limit)

    }

  };

};


// GET ONE PRODUCT
export const getProductById = async (
  id,
  tenantId
) => {

  const product =
    await prisma.product.findFirst({

      where: {
        id,
        tenantId
      }

    });

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return product;

};


// UPDATE PRODUCT
export const updateProduct = async (
  id,
  data,
  tenantId
) => {

  const existing =
    await prisma.product.findFirst({

      where: {
        id,
        tenantId
      }

    });

  if (!existing) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  const lowStock =
    data.quantity < 5;

  return prisma.product.update({

    where: {
      id
    },

    data: {
      ...data,
      lowStock
    }

  });

};


// DELETE PRODUCT
export const deleteProduct = async (
  id,
  tenantId
) => {

  const existing =
    await prisma.product.findFirst({

      where: {
        id,
        tenantId
      }

    });

  if (!existing) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return prisma.product.delete({
    where: { id }
  });

};


// UPDATE INVENTORY
export const updateInventory = async (
  id,
  quantity,
  tenantId
) => {

  const product =
    await prisma.product.findFirst({

      where: {
        id,
        tenantId
      }

    });

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  const lowStock =
    quantity < 5;

  return prisma.product.update({

    where: {
      id
    },

    data: {
      quantity,
      lowStock
    }

  });

};