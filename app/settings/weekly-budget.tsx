import { Text } from "react-native";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function WeeklyBudgetSettings() {
  return <ScreenContainer><GradientHeader title="Weekly budget" back /><Text style={{ color: colors.textSecondary }}>Weekly targets are stored per week in Supabase and used on the dashboard ring.</Text></ScreenContainer>;
}
