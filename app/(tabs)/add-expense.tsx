import { router } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import CategoryChip from "@/components/CategoryChip";
import DateSelector from "@/components/DateSelector";
import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { rupeesToPaise } from "@/lib/currency";
import type { Category } from "@/types/database";

export default function AddExpense() {
  const { session } = useSession();
  const categories = useCategories(session?.user.id);
  const expenses = useExpenses(session?.user.id);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const categoryRows: Category[] = categories.data ?? [];
  return (
    <ScreenContainer>
      <SectionHeader title="Add expense" />
      <AppInput label="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <AppInput label="Description" value={description} onChangeText={setDescription} />
      <DateSelector value={date} onChange={setDate} />
      {categoryRows.map((category) => <CategoryChip key={category.id} label={category.name} selected={category.id === categoryId} onPress={() => setCategoryId(category.id)} />)}
      <AppButton
        label="Save expense"
        loading={expenses.createExpense.isPending}
        onPress={() =>
          expenses.createExpense.mutate(
            { user_id: session?.user.id ?? "", amount_paise: rupeesToPaise(amount), description, category_id: categoryId, payment_method: "upi", expense_date: date.toISOString(), source: "manual" },
            { onSuccess: () => router.push("/(tabs)/expenses") },
          )
        }
      />
    </ScreenContainer>
  );
}
