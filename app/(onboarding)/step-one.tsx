import { router } from "expo-router";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import GlassCard from "@/components/GlassCard";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function StepOne() {
  return (
    <ScreenContainer>
      <Text style={{ color: colors.textPrimary, fontSize: 34, fontWeight: "900" }}>Set up your money story</Text>
      <GlassCard>
        <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>Add salary, fixed expenses, weekly targets, and categories once. MoneyStory keeps your daily view current from there.</Text>
      </GlassCard>
      <AppButton label="Continue" onPress={() => router.push("/(onboarding)/salary-setup")} />
    </ScreenContainer>
  );
}
