import { formatCurrency, paiseToRupees, rupeesToPaise } from "@/lib/currency";

describe("currency", () => {
  it("formats paise as INR", () => {
    expect(formatCurrency(125000)).toContain("1,250");
  });

  it("converts rupees to paise", () => {
    expect(rupeesToPaise("1,250.50")).toBe(125050);
  });

  it("converts paise to rupee string", () => {
    expect(paiseToRupees(9999)).toBe("99.99");
  });
});
