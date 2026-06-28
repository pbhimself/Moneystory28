import { useMemo } from "react";
import { buildInsights } from "@/features/insights/services/insightsService";
import type { Category, Expense } from "@/types/database";

export function useInsights(expenses: Expense[] = [], categories: Category[] = []) {
  return useMemo(() => buildInsights(expenses, categories), [expenses, categories]);
}
