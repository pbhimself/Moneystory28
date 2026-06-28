export function formatCurrency(paise: number, currency = "INR", locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function rupeesToPaise(value: string | number): number {
  const normalized = typeof value === "number" ? value : Number(value.replace(/,/g, ""));
  if (!Number.isFinite(normalized)) {
    return 0;
  }
  return Math.round(normalized * 100);
}

export function paiseToRupees(paise: number): string {
  return (paise / 100).toFixed(2);
}
