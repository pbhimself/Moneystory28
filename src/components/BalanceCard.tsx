import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CurrencyText from "@/components/CurrencyText";
import { colors, radius, spacing } from "@/theme";

type BalanceCardProps = {
  balancePaise: number;
  salaryPaise: number;
  fixedExpensePaise: number;
  spentPaise: number;
  cycleLabel: string;
  hidden?: boolean;
  onToggleHidden?: () => void;
};

export function BalanceCard({ balancePaise, salaryPaise, fixedExpensePaise, spentPaise, cycleLabel, hidden, onToggleHidden }: BalanceCardProps) {
  return (
    <LinearGradient colors={[colors.bgElevated, colors.bgCard]} style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>AVAILABLE BALANCE</Text>
          <Text style={styles.cycle}>{cycleLabel}</Text>
        </View>
        <Pressable accessibilityLabel="Toggle balance visibility" accessibilityRole="button" onPress={onToggleHidden} style={styles.iconButton}>
          {hidden ? <EyeOff color={colors.textSecondary} size={20} /> : <Eye color={colors.textSecondary} size={20} />}
        </Pressable>
      </View>
      {hidden ? <Text style={styles.hidden}>******</Text> : <CurrencyText paise={balancePaise} size="hero" />}
      <View style={styles.stats}>
        <Stat label="Salary" paise={salaryPaise} />
        <Stat label="Fixed" paise={fixedExpensePaise} />
        <Stat label="Spent" paise={spentPaise} danger />
      </View>
    </LinearGradient>
  );
}

function Stat({ label, paise, danger }: { label: string; paise: number; danger?: boolean }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <CurrencyText paise={paise} size="micro" color={danger ? colors.danger : colors.textPrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderColor: colors.border, borderRadius: radius.cardLarge, borderWidth: 1, gap: spacing.lg, padding: spacing.xl },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  label: { color: colors.violetLight, fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  cycle: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  iconButton: { alignItems: "center", backgroundColor: colors.bgOverlay, borderRadius: 14, height: 44, justifyContent: "center", width: 44 },
  hidden: { color: colors.textPrimary, fontSize: 42, fontWeight: "800" },
  stats: { flexDirection: "row", gap: spacing.sm },
  pill: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: radius.pill, flex: 1, gap: 4, padding: spacing.md },
  pillLabel: { color: colors.textMuted, fontSize: 10, fontWeight: "700", textTransform: "uppercase" },
});

export default BalanceCard;
