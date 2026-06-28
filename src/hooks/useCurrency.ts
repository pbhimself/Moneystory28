import { formatCurrency } from "@/lib/currency";

export function useCurrency(currency = "INR") {
  return {
    currency,
    format: (paise: number) => formatCurrency(paise, currency),
  };
}
