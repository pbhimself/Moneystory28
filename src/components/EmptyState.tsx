import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "@/components/AppButton";
import { colors, spacing } from "@/theme";

export function EmptyState({ icon: Icon, title, subtitle, action, onAction }: { icon: LucideIcon; title: string; subtitle: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.wrap}>
      <Icon color={colors.textMuted} size={44} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {action ? <AppButton label={action} onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: spacing.md, padding: spacing.xl },
  title: { color: colors.textPrimary, fontSize: 18, fontWeight: "800", textAlign: "center" },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: "center" },
});

export default EmptyState;
