import { Link, router } from "expo-router";
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

export default function Profile() {
  const { session } = useSession();
  const profile = useSettings(session?.user.id);
  const { signOut } = useAuth();
  const name = profile.data?.full_name ?? session?.user.email ?? "MoneyStory";
  return (
    <ScreenContainer>
      <AvatarInitials name={name} />
      <SectionHeader title={name} />
      {["salary", "weekly-budget", "categories", "sms-detection", "currency", "privacy"].map((item) => (
        <Link key={item} href={`/settings/${item}`} asChild>
          <GlassCard pressable accessibilityLabel={item}>
            <Text style={{ color: colors.textPrimary, fontWeight: "800", textTransform: "capitalize" }}>{item.replace("-", " ")}</Text>
          </GlassCard>
        </Link>
      ))}
      <AppButton label="Logout" variant="danger" loading={signOut.isPending} onPress={() => signOut.mutate(undefined, { onSuccess: () => router.replace("/") })} />
    </ScreenContainer>
  );
}
