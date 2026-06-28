import { router } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { rupeesToPaise } from "@/lib/currency";
import { startOfWeek } from "@/lib/dates";

export default function WeeklyTarget() {
  const { session } = useSession();
  const [target, setTarget] = useState("");
  const { saveWeeklyTarget } = useOnboarding();
  return (
    <ScreenContainer>
      <GradientHeader title="Weekly target" subtitle="Set a spend target for this week" back />
      <AppInput label="Weekly target" keyboardType="numeric" value={target} onChangeText={setTarget} />
      <AppButton
        label="Save and continue"
        loading={saveWeeklyTarget.isPending}
        onPress={() =>
          saveWeeklyTarget.mutate(
            { user_id: session?.user.id ?? "", week_start: startOfWeek(new Date()).toISOString().slice(0, 10), target_amount_paise: rupeesToPaise(target), currency: "INR" },
            { onSuccess: () => router.push("/(onboarding)/categories-setup") },
          )
        }
      />
    </ScreenContainer>
  );
}
