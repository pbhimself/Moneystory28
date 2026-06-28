import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/features/dashboard/services/dashboardService";

export function useDashboard(userId?: string) {
  return useQuery({
    queryKey: ["dashboard", userId],
    enabled: Boolean(userId),
    queryFn: () => getDashboardData(userId ?? ""),
  });
}
