import { router } from "expo-router";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AvatarInitials from "@/components/AvatarInitials";
import GlassCard from "@/components/GlassCard";
import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSession } from "@/features/auth/hooks/useSession";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { colors } from "@/theme";

const settingsRoutes = [
  { label: "salary", href: "/settings/salary" },
  { label: "weekly-budget", href: "/settings/weekly-budget" },
  { label: "categories", href: "/settings/categories" },
  { label: "sms-detection", href: "/settings/sms-detection" },
  { label: "currency", href: "/settings/currency" },
  { label: "privacy", href: "/settings/privacy" },
] as const;

export default function Profile() {
  const { session } = useSession();
  const profile = useSettings(session?.user.id);
  const { signOut } = useAuth();
  const name = profile.data?.full_name ?? session?.user.email ?? "MoneyStory";
  return (
    <ScreenContainer>
      <AvatarInitials name={name} />
      <SectionHeader title={name} />
      {settingsRoutes.map((item) => (
        <GlassCard key={item.href} pressable accessibilityLabel={item.label} onPress={() => router.push(item.href)}>
          <Text style={{ color: colors.textPrimary, fontWeight: "800", textTransform: "capitalize" }}>{item.label.replace("-", " ")}</Text>
        </GlassCard>
      ))}
      <AppButton label="Logout" variant="danger" loading={signOut.isPending} onPress={() => signOut.mutate(undefined, { onSuccess: () => router.replace("/") })} />
    </ScreenContainer>
  );
}
