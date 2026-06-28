import { z } from "zod";
import { positiveMoneyString } from "@/utils/validators";

export const salarySetupSchema = z.object({
  monthlySalary: positiveMoneyString,
  fixedExpenses: z.string().default("0"),
  salaryDay: z.coerce.number().min(1).max(28),
  currency: z.string().min(3).max(3),
});

export const weeklyTargetSchema = z.object({
  weeklyTarget: positiveMoneyString,
});
