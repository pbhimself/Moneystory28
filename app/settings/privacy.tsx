import { Text } from "react-native";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { colors } from "@/theme";

export default function PrivacySettings() {
  return <ScreenContainer><GradientHeader title="Privacy" back /><Text style={{ color: colors.textSecondary, lineHeight: 22 }}>Supabase stores account, settings, categories, and expenses. SMS message bodies stay on-device and are not sent to Supabase.</Text></ScreenContainer>;
}
