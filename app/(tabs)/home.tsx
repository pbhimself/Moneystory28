import { router } from "expo-router";
import { Text, View } from "react-native";
import AvatarInitials from "@/components/AvatarInitials";
import BalanceCard from "@/components/BalanceCard";
import ExpenseItem from "@/components/ExpenseItem";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ProgressRing from "@/components/ProgressRing";
import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import SmartInsightCard from "@/components/SmartInsightCard";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { dashboardTotals, weeklyUsagePercent } from "@/lib/finance";
import { useUiStore } from "@/store/uiStore";
import { colors } from "@/theme";
import type { Category, Expense } from "@/types/database";

export default function Home() {
  const { session } = useSession();
  const dashboard = useDashboard(session?.user.id);
  const categories = useCategories(session?.user.id);
  const hidden = useUiStore((state) => state.balanceHidden);
  const toggle = useUiStore((state) => state.toggleBalanceHidden);
  if (dashboard.isLoading) return <ScreenContainer><LoadingSkeleton variant="balance" /></ScreenContainer>;
  const data = dashboard.data;
  const totals = dashboardTotals({
    expenses: data?.expenses ?? [],
    salaryPaise: data?.salary?.monthly_salary_paise ?? 0,
    fixedExpensePaise: data?.salary?.fixed_monthly_expense_paise ?? 0,
    weeklyTargetPaise: data?.weekly?.target_amount_paise ?? 1,
  });
  const expenseRows: Expense[] = data?.expenses ?? [];
  const categoryRows: Category[] = categories.data ?? [];
  const categoryName = (id: string | null) => categoryRows.find((category) => category.id === id)?.name ?? "Uncategorized";
  const categoryColor = (id: string | null) => categoryRows.find((category) => category.id === id)?.color ?? colors.textMuted;
  return (
    <ScreenContainer refreshing={dashboard.isRefetching} onRefresh={() => dashboard.refetch()}>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: colors.textMuted }}>Welcome back</Text>
          <Text style={{ color: colors.textPrimary, fontSize: 24, fontWeight: "900" }}>{data?.profile.full_name}</Text>
        </View>
        <AvatarInitials name={data?.profile.full_name ?? "MoneyStory"} />
      </View>
      <BalanceCard balancePaise={totals.monthlyAvailablePaise} salaryPaise={totals.salaryPaise} fixedExpensePaise={totals.fixedExpensePaise} spentPaise={totals.spentThisMonthPaise} cycleLabel="Current salary cycle" hidden={hidden} onToggleHidden={toggle} />
      <View style={{ alignItems: "center" }}>
        <ProgressRing percent={weeklyUsagePercent(totals.spentThisWeekPaise, data?.weekly?.target_amount_paise ?? 1)} label="Weekly" />
      </View>
      <SmartInsightCard text={`Today you spent ${totals.spentTodayPaise / 100}. Keep the weekly rhythm visible before small spends compound.`} />
      <SectionHeader title="Recent expenses" action="View all" onAction={() => router.push("/(tabs)/expenses")} />
      {expenseRows.slice(0, 5).map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          categoryName={categoryName(expense.category_id)}
          categoryColor={categoryColor(expense.category_id)}
          onPress={() => router.push(`/expense/${expense.id}`)}
        />
      ))}
    </ScreenContainer>
  );
}
