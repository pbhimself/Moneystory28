import type { PaymentMethod } from "@/types/database";

export type ParsedSmsPayment = {
  amountPaise: number;
  merchantName: string | null;
  paymentMethod: PaymentMethod;
  transactionDate: Date;
  isDebit: boolean;
  raw: string;
};
