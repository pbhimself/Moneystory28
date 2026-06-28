import { dashboardTotals, recommendedWeeklyTarget, remainingBalance, spentThisMonth, spentThisWeek, spentToday, sumExpenses, weeklyUsagePercent } from "@/lib/finance";

const expenses = [
  { amount_paise: 10000, expense_date: "2026-06-28T10:00:00.000Z", category_id: "a" },
  { amount_paise: 25000, expense_date: "2026-06-24T10:00:00.000Z", category_id: "b" },
  { amount_paise: 50000, expense_date: "2026-05-10T10:00:00.000Z", category_id: "a" },
];

describe("finance", () => {
  const today = new Date("2026-06-28T12:00:00.000Z");

  it("sums expenses", () => {
    expect(sumExpenses(expenses)).toBe(85000);
  });

  it("calculates period totals", () => {
    expect(spentToday(expenses, today)).toBe(10000);
    expect(spentThisWeek(expenses, today)).toBe(35000);
    expect(spentThisMonth(expenses, today)).toBe(35000);
  });

  it("calculates remaining balance and targets", () => {
    expect(remainingBalance(100000, 20000, 30000)).toBe(50000);
    expect(recommendedWeeklyTarget(400000, today)).toBeGreaterThan(0);
    expect(weeklyUsagePercent(5000, 10000)).toBe(50);
  });

  it("builds dashboard totals", () => {
    const totals = dashboardTotals({ expenses, salaryPaise: 100000, fixedExpensePaise: 10000, weeklyTargetPaise: 50000, today });
    expect(totals.monthlyAvailablePaise).toBe(55000);
    expect(totals.remainingWeeklyPaise).toBe(15000);
  });
});
