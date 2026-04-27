import { transferInventory } from "./inventory.service.js";
import { transferSchema } from "./inventory.validator.js";

export const transfer = async (req, res, next) => {
  try {
    const data = transferSchema.parse(req.body);

    const result = await transferInventory(
      data,
      req.user.tenantId
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};