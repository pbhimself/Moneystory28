import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, listCategories } from "@/features/categories/services/categoryService";

export function useCategories(userId?: string) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ["categories", userId],
    enabled: Boolean(userId),
    queryFn: () => listCategories(userId ?? ""),
  });
  return {
    ...query,
    createCategory: useMutation({
      mutationFn: createCategory,
      onSuccess: () => client.invalidateQueries({ queryKey: ["categories", userId] }),
    }),
    deleteCategory: useMutation({
      mutationFn: (id: string) => deleteCategory(id, userId ?? ""),
      onSuccess: () => client.invalidateQueries({ queryKey: ["categories", userId] }),
    }),
  };
}
