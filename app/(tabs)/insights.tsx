import { Text, View } from "react-native";
import ProgressBar from "@/components/ProgressBar";
import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import SmartInsightCard from "@/components/SmartInsightCard";
import { useSession } from "@/features/auth/hooks/useSession";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { useInsights } from "@/features/insights/hooks/useInsights";
import { formatCurrency } from "@/lib/currency";
import { colors } from "@/theme";

export default function Insights() {
  const { session } = useSession();
  const expenses = useExpenses(session?.user.id);
  const categories = useCategories(session?.user.id);
  const insights = useInsights(expenses.data ?? [], categories.data ?? []);
  return (
    <ScreenContainer>
      <SectionHeader title="Insights" />
      <SmartInsightCard text={insights.insight} />
      {insights.categoryRows.map((row) => (
        <View key={row.categoryId ?? "none"} style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, fontWeight: "800" }}>{row.categoryName} · {formatCurrency(row.amountPaise)}</Text>
          <ProgressBar value={row.amountPaise} max={Math.max(insights.monthly, 1)} />
        </View>
      ))}
    </ScreenContainer>
  );
}
