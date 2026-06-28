import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import CurrencyText from "@/components/CurrencyText";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSession } from "@/features/auth/hooks/useSession";
import { useExpenseDetail } from "@/features/expenses/hooks/useExpenseDetail";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { shortDateTime } from "@/utils/formatters";
import { colors } from "@/theme";

export default function ExpenseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useSession();
  const { expense } = useExpenseDetail(id, session?.user.id);
  const expenses = useExpenses(session?.user.id);
  const row = expense.data;
  return (
    <ScreenContainer>
      <GradientHeader title="Expense detail" back />
      {row ? (
        <>
          <CurrencyText paise={row.amount_paise} size="hero" color={colors.danger} />
          <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "800" }}>{row.description}</Text>
          <Text style={{ color: colors.textMuted }}>{row.payment_method.replace("_", " ")} · {shortDateTime(row.expense_date)}</Text>
          <AppButton label="Edit" onPress={() => router.push(`/expense/edit/${row.id}`)} />
          <AppButton label="Delete" variant="danger" loading={expenses.deleteExpense.isPending} onPress={() => expenses.deleteExpense.mutate(row.id, { onSuccess: () => router.back() })} />
        </>
      ) : null}
    </ScreenContainer>
  );
}
