import prisma from "../../prisma/client.js";
import { AppError } from "../../utils/errors.js";

export const createLocation = async (data, tenantId) => {
  return await prisma.location.create({
    data: {
      ...data,
      tenantId
    }
  });
};

export const getLocations = async (tenantId) => {
  return await prisma.location.findMany({
    where: { tenantId }
  });
};

export const getLocationById = async (id, tenantId) => {
  const location = await prisma.location.findFirst({
    where: { id, tenantId }
  });

  if (!location) {
    throw new AppError("Location not found", 404);
  }

  return location;
};

export const updateLocation = async (id, data, tenantId) => {
  await getLocationById(id, tenantId);

  return await prisma.location.update({
    where: { id },
    data
  });
};

export const deleteLocation = async (id, tenantId) => {
  await getLocationById(id, tenantId);

  return await prisma.location.delete({
    where: { id }
  });
};