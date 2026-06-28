import { endOfDay, endOfMonth, endOfWeek, isWithin, startOfDay, startOfMonth, startOfWeek } from "@/lib/dates";
import type { CategorySpend, DashboardTotals, ExpenseLike } from "@/types/finance";
import type { Category } from "@/types/database";

export function sumExpenses(expenses: ExpenseLike[]): number {
  return expenses.reduce((total, expense) => total + expense.amount_paise, 0);
}

export function spentBetween(expenses: ExpenseLike[], start: Date, end: Date): number {
  return sumExpenses(expenses.filter((expense) => isWithin(expense.expense_date, start, end)));
}

export function spentToday(expenses: ExpenseLike[], today = new Date()): number {
  return spentBetween(expenses, startOfDay(today), endOfDay(today));
}

export function spentThisWeek(expenses: ExpenseLike[], today = new Date()): number {
  return spentBetween(expenses, startOfWeek(today), endOfWeek(today));
}

export function spentThisMonth(expenses: ExpenseLike[], today = new Date()): number {
  return spentBetween(expenses, startOfMonth(today), endOfMonth(today));
}

export function remainingBalance(salaryPaise: number, fixedPaise: number, spentPaise: number): number {
  return Math.max(salaryPaise - fixedPaise - spentPaise, 0);
}

export function recommendedWeeklyTarget(monthlyAvailablePaise: number, today = new Date()): number {
  const end = endOfMonth(today);
  const remainingDays = Math.max(1, Math.ceil((end.getTime() - today.getTime()) / 86_400_000));
  const remainingWeeks = Math.max(1, Math.ceil(remainingDays / 7));
  return Math.max(Math.floor(monthlyAvailablePaise / remainingWeeks), 100);
}

export function weeklyUsagePercent(spentPaise: number, targetPaise: number): number {
  if (targetPaise <= 0) {
    return 0;
  }
  return Math.round((spentPaise / targetPaise) * 100);
}

export function categorySpend(expenses: ExpenseLike[], categories: Category[]): CategorySpend[] {
  const byId = new Map(categories.map((category) => [category.id, category]));
  const grouped = new Map<string, CategorySpend>();
  for (const expense of expenses) {
    const id = expense.category_id ?? "uncategorized";
    const category = expense.category_id ? byId.get(expense.category_id) : null;
    const current = grouped.get(id) ?? {
      categoryId: expense.category_id,
      categoryName: category?.name ?? "Uncategorized",
      color: category?.color ?? "#5A6A82",
      amountPaise: 0,
      count: 0,
    };
    current.amountPaise += expense.amount_paise;
    current.count += 1;
    grouped.set(id, current);
  }
  return [...grouped.values()].sort((a, b) => b.amountPaise - a.amountPaise);
}

export function dashboardTotals(params: {
  expenses: ExpenseLike[];
  salaryPaise: number;
  fixedExpensePaise: number;
  weeklyTargetPaise: number;
  today?: Date;
}): DashboardTotals {
  const today = params.today ?? new Date();
  const monthSpent = spentThisMonth(params.expenses, today);
  const weekSpent = spentThisWeek(params.expenses, today);
  const monthlyAvailable = remainingBalance(params.salaryPaise, params.fixedExpensePaise, monthSpent);
  return {
    salaryPaise: params.salaryPaise,
    fixedExpensePaise: params.fixedExpensePaise,
    spentThisMonthPaise: monthSpent,
    spentThisWeekPaise: weekSpent,
    spentTodayPaise: spentToday(params.expenses, today),
    monthlyAvailablePaise: monthlyAvailable,
    remainingWeeklyPaise: Math.max(params.weeklyTargetPaise - weekSpent, 0),
  };
}
