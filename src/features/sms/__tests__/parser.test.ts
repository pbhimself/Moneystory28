import { parsePaymentSms } from "@/features/sms/parser";

const samples = [
  "Your A/c XXXX debited by Rs.350 at Zomato on 28-06-26",
  "UPI txn of Rs.899 to Swiggy ref 123456 on 28/06/2026",
  "Rs.1,250 spent using your SBI Debit Card at Amazon",
  "INR 500 debited from your account ending 1234",
  "₹2,000 paid via UPI to PhonePe Merchant",
  "Your HDFC Bank Credit Card has been used for Rs.3,499 at Myntra",
  "Alert: Rs.750 debited from A/c XX1234 for IRCTC on 27-Jun-26",
  "Dear customer, Rs.150 deducted from your account towards Jio Recharge",
  "Transaction of INR 599 done at Netflix.com on 2026-06-28",
  "POS txn Rs.2,200 at DMART RETAIL using Debit Card",
  "NEFT/IMPS of Rs.10,000 transferred from your account",
  "Sent Rs.500 to 9876543210@upi via UPI",
  "Your account has been debited Rs.1,100 for EMI payment",
  "Auto debit of Rs.399 towards Netflix subscription",
  "₹1,800 withdrawn from ATM at Kotak Bank on 28 Jun 2026",
];

describe("parsePaymentSms", () => {
  it("parses all requested debit patterns", () => {
    for (const sample of samples) {
      const parsed = parsePaymentSms(sample, new Date(2026, 5, 28));
      expect(parsed?.isDebit).toBe(true);
      expect(parsed?.amountPaise).toBeGreaterThan(0);
    }
  });

  it("ignores credits, OTP, promos, and balance messages", () => {
    expect(parsePaymentSms("Salary credited INR 100000")).toBeNull();
    expect(parsePaymentSms("OTP 123456 for UPI login")).toBeNull();
    expect(parsePaymentSms("Cashback credited Rs.20")).toBeNull();
    expect(parsePaymentSms("Balance in your account is Rs.5000")).toBeNull();
  });
});
