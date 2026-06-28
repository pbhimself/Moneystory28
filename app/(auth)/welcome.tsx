import { Link } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import AppButton from "@/components/AppButton";
import GlassCard from "@/components/GlassCard";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function Welcome() {
  return (
    <ScreenContainer scroll={false}>
      <View style={{ flex: 1, gap: 24, justifyContent: "center", padding: 20 }}>
        <ShieldCheck color={colors.gold} size={54} />
        <View>
          <Text style={{ color: colors.textPrimary, fontSize: 42, fontWeight: "900" }}>MoneyStory</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 16, marginTop: 6 }}>Your money. Your story.</Text>
        </View>
        <GlassCard>
          <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>Private banking-grade expense tracking for salary, budgets, categories, insights, and reviewed SMS detections.</Text>
        </GlassCard>
        <Link href="/(auth)/sign-in" asChild><AppButton label="Sign in" fullWidth /></Link>
        <Link href="/(auth)/sign-up" asChild><AppButton label="Create account" variant="secondary" fullWidth /></Link>
      </View>
    </ScreenContainer>
  );
}
