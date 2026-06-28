import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSession } from "@/features/auth/hooks/useSession";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { colors } from "@/theme";

export default function Index() {
  const { session, initialized } = useSession();
  const profile = useSettings(session?.user.id);
  if (!initialized || (session && profile.isLoading)) {
    return <View style={{ alignItems: "center", backgroundColor: colors.bgDeep, flex: 1, justifyContent: "center" }}><ActivityIndicator color={colors.violet} /></View>;
  }
  if (!session) return <Redirect href="/(auth)/welcome" />;
  if (!profile.data?.onboarding_completed) return <Redirect href="/(onboarding)/step-one" />;
  return <Redirect href="/(tabs)/home" />;
}
