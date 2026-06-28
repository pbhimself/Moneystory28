import { router } from "expo-router";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import CategoryChip from "@/components/CategoryChip";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { colors } from "@/theme";

export default function CategoriesSetup() {
  const { session } = useSession();
  const categories = useCategories(session?.user.id);
  const { complete } = useOnboarding();
  return (
    <ScreenContainer>
      <GradientHeader title="Categories" subtitle="Review your default spending categories" back />
      {categories.data?.map((category) => <CategoryChip key={category.id} label={category.name} selected />)}
      <Text style={{ color: colors.textMuted }}>You can add custom categories later from Settings.</Text>
      <AppButton label="Finish setup" loading={complete.isPending} onPress={() => complete.mutate(session?.user.id ?? "", { onSuccess: () => router.replace("/") })} />
    </ScreenContainer>
  );
}
