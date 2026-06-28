import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/features/settings/services/settingsService";

export function useSettings(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: Boolean(userId),
    queryFn: () => getProfile(userId ?? ""),
  });
}
