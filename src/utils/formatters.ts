import { formatCurrency } from "@/lib/currency";

export const money = formatCurrency;

export function shortDate(value: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}

export function shortDateTime(value: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
