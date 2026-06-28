import { categorySpend, spentThisMonth } from "@/lib/finance";
import type { Category, Expense } from "@/types/database";

export function buildInsights(expenses: Expense[], categories: Category[]) {
  const categoryRows = categorySpend(expenses, categories);
  const top = categoryRows[0];
  const monthly = spentThisMonth(expenses);
  const insight = top
    ? `Your largest category this month is ${top.categoryName}. It accounts for ${Math.round((top.amountPaise / Math.max(monthly, 1)) * 100)}% of tracked spending.`
    : "Add your first expense to unlock spending insights.";
  return { categoryRows, monthly, insight };
}
