import { z } from "zod";

export const transferSchema = z.object({
  productId: z.string(),
  fromLocationId: z.string(),
  toLocationId: z.string(),
  quantity: z.number().int().positive()
});