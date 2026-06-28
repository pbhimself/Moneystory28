import { Sparkles } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import GlassCard from "@/components/GlassCard";
import { colors, spacing } from "@/theme";

export function SmartInsightCard({ text }: { text: string }) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.row}>
        <Sparkles color={colors.violetLight} size={20} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.violetGlow },
  row: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  text: { color: colors.textSecondary, flex: 1, lineHeight: 20 },
});

export default SmartInsightCard;
