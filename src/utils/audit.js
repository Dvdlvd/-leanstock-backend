import prisma from "../prisma/client.js";

export const createAuditLog =
  async ({
    action,
    entity,
    entityId,
    details,
    userId,
    tenantId
  }) => {

    await prisma.auditLog.create({

      data: {
        action,
        entity,
        entityId,
        details,
        userId,
        tenantId
      }

    });

};