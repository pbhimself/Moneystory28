import { Text } from "react-native";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function SalarySettings() {
  return <ScreenContainer><GradientHeader title="Salary" back /><Text style={{ color: colors.textSecondary }}>Update salary from onboarding by rerunning salary setup from the profile flow.</Text></ScreenContainer>;
}
