import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { rupeesToPaise } from "@/lib/currency";
import { colors } from "@/theme";

export default function SalarySetup() {
  const { session } = useSession();
  const [salary, setSalary] = useState("");
  const [fixed, setFixed] = useState("0");
  const [day, setDay] = useState("1");
  const [currency, setCurrency] = useState("INR");
  const { saveSalary } = useOnboarding();
  return (
    <ScreenContainer>
      <GradientHeader title="Salary setup" subtitle="All amounts are stored in paise" back />
      <AppInput label="Monthly salary" keyboardType="numeric" value={salary} onChangeText={setSalary} />
      <AppInput label="Fixed monthly expenses" keyboardType="numeric" value={fixed} onChangeText={setFixed} />
      <AppInput label="Salary received day (1-28)" keyboardType="numeric" value={day} onChangeText={setDay} />
      <AppInput label="Currency" autoCapitalize="characters" value={currency} onChangeText={setCurrency} />
      {saveSalary.error ? <Text style={{ color: colors.danger }}>{saveSalary.error.message}</Text> : null}
      <AppButton
        label="Save and continue"
        loading={saveSalary.isPending}
        onPress={() =>
          saveSalary.mutate(
            { user_id: session?.user.id ?? "", monthly_salary_paise: rupeesToPaise(salary), fixed_monthly_expense_paise: rupeesToPaise(fixed), salary_received_day: Number(day), currency },
            { onSuccess: () => router.push("/(onboarding)/weekly-target") },
          )
        }
      />
    </ScreenContainer>
  );
}
