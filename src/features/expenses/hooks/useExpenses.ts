import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExpense, deleteExpense, listExpenses } from "@/features/expenses/services/expenseService";

export function useExpenses(userId?: string) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ["expenses", userId],
    enabled: Boolean(userId),
    queryFn: () => listExpenses(userId ?? ""),
  });
  return {
    ...query,
    createExpense: useMutation({
      mutationFn: createExpense,
      onSuccess: () => client.invalidateQueries({ queryKey: ["expenses", userId] }),
    }),
    deleteExpense: useMutation({
      mutationFn: (id: string) => deleteExpense(id, userId ?? ""),
      onSuccess: () => client.invalidateQueries({ queryKey: ["expenses", userId] }),
    }),
  };
}
