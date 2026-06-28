import type { PaymentMethod } from "@/types/database";
import type { ParsedSmsPayment } from "@/types/sms";

const ignorePatterns = [/otp/i, /one time password/i, /credited/i, /credit transaction/i, /salary/i, /refund/i, /cashback/i, /promo/i, /offer/i, /balance/i];
const debitPatterns = [/debited/i, /spent/i, /paid/i, /deducted/i, /withdrawn/i, /used for/i, /txn/i, /transferred from/i, /sent/i, /auto debit/i, /done at/i];

export function parsePaymentSms(raw: string, now = new Date()): ParsedSmsPayment | null {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text || ignorePatterns.some((pattern) => pattern.test(text))) {
    return null;
  }
  const isDebit = debitPatterns.some((pattern) => pattern.test(text));
  if (!isDebit) {
    return null;
  }
  const amount = extractAmount(text);
  if (!amount) {
    return null;
  }
  return {
    amountPaise: amount,
    merchantName: extractMerchant(text),
    paymentMethod: extractPaymentMethod(text),
    transactionDate: extractDate(text, now),
    isDebit: true,
    raw,
  };
}

function extractAmount(text: string): number | null {
  const match = text.match(/(?:rs\.?|inr|₹)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i);
  if (!match?.[1]) {
    return null;
  }
  return Math.round(Number(match[1].replace(/,/g, "")) * 100);
}

function extractPaymentMethod(text: string): PaymentMethod {
  if (/credit card/i.test(text)) return "credit_card";
  if (/debit card|pos/i.test(text)) return "debit_card";
  if (/upi|phonepe|gpay|paytm/i.test(text)) return "upi";
  if (/wallet/i.test(text)) return "wallet";
  if (/neft|imps|bank transfer|account|a\/c/i.test(text)) return "bank_transfer";
  if (/atm|withdrawn/i.test(text)) return "cash";
  return "other";
}

function extractMerchant(text: string): string | null {
  const patterns = [
    / at ([A-Za-z0-9 .&-]+?)(?: on | using | ref |$)/i,
    / to ([A-Za-z0-9@._ -]+?)(?: ref | via | on |$)/i,
    / towards ([A-Za-z0-9 .&-]+?)(?: on |$)/i,
    / for ([A-Za-z0-9 .&-]+?)(?: on |$)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    const value = match?.[1]?.trim().replace(/[. ]+$/, "");
    if (value && !/your account|a\/c|account ending/i.test(value)) {
      return normalizeMerchant(value);
    }
  }
  return null;
}

function normalizeMerchant(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => (part.includes("@") || part.toUpperCase() === part ? part : part[0]?.toUpperCase() + part.slice(1)))
    .join(" ");
}

function extractDate(text: string, fallback: Date): Date {
  const iso = text.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if (iso?.[1] && iso[2] && iso[3]) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  const slash = text.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
  if (slash?.[1] && slash[2] && slash[3]) return toDate(Number(slash[1]), Number(slash[2]), slash[3]);
  const dash = text.match(/\b(\d{1,2})-(\d{1,2})-(\d{2,4})\b/);
  if (dash?.[1] && dash[2] && dash[3]) return toDate(Number(dash[1]), Number(dash[2]), dash[3]);
  const month = text.match(/\b(\d{1,2})[- ](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[- ](\d{2,4})\b/i);
  if (month?.[1] && month[2] && month[3]) {
    const monthIndex = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(month[2].slice(0, 3).toLowerCase());
    return new Date(normalizeYear(month[3]), monthIndex, Number(month[1]));
  }
  return fallback;
}

function toDate(day: number, month: number, year: string): Date {
  return new Date(normalizeYear(year), month - 1, day);
}

function normalizeYear(year: string): number {
  return year.length === 2 ? 2000 + Number(year) : Number(year);
}
