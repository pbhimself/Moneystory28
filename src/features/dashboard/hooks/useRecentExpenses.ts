import { useExpenses } from "@/features/expenses/hooks/useExpenses";

export function useRecentExpenses(userId?: string) {
  const query = useExpenses(userId);
  return { ...query, data: query.data?.slice(0, 5) };
}
