import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useExpenseDetail } from "@/features/expenses/hooks/useExpenseDetail";
import { paiseToRupees, rupeesToPaise } from "@/lib/currency";

export default function EditExpense() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useSession();
  const { expense, updateExpense } = useExpenseDetail(id, session?.user.id);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (expense.data) {
      setAmount(paiseToRupees(expense.data.amount_paise));
      setDescription(expense.data.description);
    }
  }, [expense.data]);
  return (
    <ScreenContainer>
      <GradientHeader title="Edit expense" back />
      <AppInput label="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <AppInput label="Description" value={description} onChangeText={setDescription} />
      <AppButton label="Save changes" loading={updateExpense.isPending} onPress={() => updateExpense.mutate({ amount_paise: rupeesToPaise(amount), description }, { onSuccess: () => router.back() })} />
    </ScreenContainer>
  );
}
