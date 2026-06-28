import { z } from "zod";

export const positiveMoneyString = z
  .string()
  .trim()
  .refine((value) => Number(value.replace(/,/g, "")) > 0, "Enter an amount greater than zero");

export const uuidString = z.string().uuid();
