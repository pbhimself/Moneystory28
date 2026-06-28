import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpense, updateExpense } from "@/features/expenses/services/expenseService";
import type { Tables } from "@/types/database";

export function useExpenseDetail(id: string, userId?: string) {
  const client = useQueryClient();
  return {
    expense: useQuery({
      queryKey: ["expense", id, userId],
      enabled: Boolean(id && userId),
      queryFn: () => getExpense(id, userId ?? ""),
    }),
    updateExpense: useMutation({
      mutationFn: (input: Tables["expenses"]["Update"]) => updateExpense(id, userId ?? "", input),
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["expenses", userId] });
        client.invalidateQueries({ queryKey: ["expense", id, userId] });
      },
    }),
  };
}
