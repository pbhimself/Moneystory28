import { useState } from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import CategoryChip from "@/components/CategoryChip";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import type { Category } from "@/types/database";

export default function CategorySettings() {
  const { session } = useSession();
  const categories = useCategories(session?.user.id);
  const [name, setName] = useState("");
  const categoryRows: Category[] = categories.data ?? [];
  return (
    <ScreenContainer>
      <GradientHeader title="Categories" back />
      <AppInput label="New category" value={name} onChangeText={setName} />
      <AppButton label="Add category" onPress={() => categories.createCategory.mutate({ user_id: session?.user.id ?? "", name, icon: "circle", color: "#7B6EF6" }, { onSuccess: () => setName("") })} />
      {categoryRows.map((category) => <CategoryChip key={category.id} label={category.name} />)}
    </ScreenContainer>
  );
}
