import { Text } from "react-native";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function CurrencySettings() {
  return <ScreenContainer><GradientHeader title="Currency" back /><Text style={{ color: colors.textSecondary }}>Preferred currency is stored on the profile and defaults to INR.</Text></ScreenContainer>;
}
