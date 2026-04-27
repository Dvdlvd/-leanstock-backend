import { z } from "zod";

export const createLocationSchema = z.object({
  name: z.string().min(1)
});

export const updateLocationSchema = z.object({
  name: z.string().min(1).optional()
});