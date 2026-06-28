import { Pressable, StyleSheet, Text, View } from "react-native";
import { BadgeIndianRupee } from "lucide-react-native";
import CurrencyText from "@/components/CurrencyText";
import { shortDateTime } from "@/utils/formatters";
import { colors, radius, spacing } from "@/theme";
import type { Expense } from "@/types/database";

export function ExpenseItem({ expense, categoryName, categoryColor, onPress }: { expense: Expense; categoryName: string; categoryColor: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={expense.description} onPress={onPress} style={styles.row}>
      <View style={[styles.icon, { backgroundColor: `${categoryColor}22` }]}>
        <BadgeIndianRupee color={categoryColor} size={20} />
      </View>
      <View style={styles.main}>
        <Text style={styles.title} numberOfLines={1}>{expense.merchant_name ?? expense.description}</Text>
        <Text style={styles.meta} numberOfLines={1}>{categoryName} · {expense.payment_method.replace("_", " ")}</Text>
        {expense.source === "sms_detected" ? <Text style={styles.sms}>SMS detected</Text> : null}
      </View>
      <View style={styles.amount}>
        <CurrencyText paise={expense.amount_paise} color={colors.danger} />
        <Text style={styles.time}>{shortDateTime(expense.expense_date)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: "center", backgroundColor: colors.bgCard, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flexDirection: "row", gap: spacing.md, minHeight: 76, padding: spacing.md },
  icon: { alignItems: "center", borderRadius: radius.icon, height: 44, justifyContent: "center", width: 44 },
  main: { flex: 1, gap: 3 },
  title: { color: colors.textPrimary, fontSize: 14, fontWeight: "800" },
  meta: { color: colors.textMuted, fontSize: 12, textTransform: "capitalize" },
  sms: { color: colors.gold, fontSize: 10, fontWeight: "700" },
  amount: { alignItems: "flex-end", maxWidth: 112 },
  time: { color: colors.textMuted, fontSize: 9, marginTop: 4 },
});

export default ExpenseItem;
