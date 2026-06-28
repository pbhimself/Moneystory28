import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/theme";

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" accessibilityLabel={action} onPress={onAction}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: "800" },
  action: { color: colors.violetLight, fontSize: 13, fontWeight: "700" },
});

export default SectionHeader;
