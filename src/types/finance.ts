import type { Expense } from "@/types/database";

export type DashboardTotals = {
  salaryPaise: number;
  fixedExpensePaise: number;
  spentThisMonthPaise: number;
  spentThisWeekPaise: number;
  spentTodayPaise: number;
  monthlyAvailablePaise: number;
  remainingWeeklyPaise: number;
};

export type CategorySpend = {
  categoryId: string | null;
  categoryName: string;
  color: string;
  amountPaise: number;
  count: number;
};

export type ExpenseLike = Pick<Expense, "amount_paise" | "expense_date" | "category_id">;
