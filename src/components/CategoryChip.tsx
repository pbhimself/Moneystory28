import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "@/theme";

export function CategoryChip({ label, selected, amount, onPress }: { label: string; selected?: boolean; amount?: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
      {amount ? <Text style={styles.amount}>{amount}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 42,
    paddingHorizontal: spacing.md,
  },
  selected: { backgroundColor: colors.violetGlow, borderColor: colors.violet },
  label: { color: colors.textSecondary, fontWeight: "700" },
  selectedLabel: { color: colors.violetLight },
  amount: { color: colors.textMuted, fontSize: 11 },
});

export default CategoryChip;
