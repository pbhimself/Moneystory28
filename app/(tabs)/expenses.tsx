import { Link } from "expo-router";
import { Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import AppInput from "@/components/AppInput";
import EmptyState from "@/components/EmptyState";
import ExpenseItem from "@/components/ExpenseItem";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { colors } from "@/theme";

export default function Expenses() {
  const { session } = useSession();
  const [search, setSearch] = useState("");
  const expenses = useExpenses(session?.user.id);
  const categories = useCategories(session?.user.id);
  const rows = useMemo(() => (expenses.data ?? []).filter((expense) => `${expense.description} ${expense.merchant_name ?? ""}`.toLowerCase().includes(search.toLowerCase())), [expenses.data, search]);
  const categoryName = (id: string | null) => categories.data?.find((category) => category.id === id)?.name ?? "Uncategorized";
  const categoryColor = (id: string | null) => categories.data?.find((category) => category.id === id)?.color ?? colors.textMuted;
  return (
    <ScreenContainer refreshing={expenses.isRefetching} onRefresh={() => expenses.refetch()}>
      <SectionHeader title="Expense history" />
      <AppInput label="Search" value={search} onChangeText={setSearch} leftIcon={<Search color={colors.textMuted} size={18} />} />
      {expenses.isLoading ? <LoadingSkeleton /> : null}
      {rows.length === 0 && !expenses.isLoading ? <EmptyState icon={Search} title="No expenses found" subtitle="Try another search or add a new expense." /> : null}
      {rows.map((expense) => (
        <Link key={expense.id} href={`/expense/${expense.id}`} asChild>
          <ExpenseItem expense={expense} categoryName={categoryName(expense.category_id)} categoryColor={categoryColor(expense.category_id)} />
        </Link>
      ))}
    </ScreenContainer>
  );
}
