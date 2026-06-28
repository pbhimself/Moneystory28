import { useMutation } from "@tanstack/react-query";
import { completeOnboarding, upsertSalarySettings, upsertWeeklyTarget } from "@/features/onboarding/services/onboardingService";

export function useOnboarding() {
  return {
    saveSalary: useMutation({ mutationFn: upsertSalarySettings }),
    saveWeeklyTarget: useMutation({ mutationFn: upsertWeeklyTarget }),
    complete: useMutation({ mutationFn: completeOnboarding }),
  };
}
