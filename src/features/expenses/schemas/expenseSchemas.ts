import { z } from "zod";
import { positiveMoneyString } from "@/utils/validators";

export const expenseSchema = z.object({
  amount: positiveMoneyString,
  description: z.string().min(2),
  merchantName: z.string().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  paymentMethod: z.enum(["cash", "upi", "debit_card", "credit_card", "bank_transfer", "wallet", "other"]),
  expenseDate: z.date(),
});
