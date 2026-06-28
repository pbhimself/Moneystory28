import { ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing } from "@/theme";

export function GradientHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: boolean }) {
  const router = useRouter();
  return (
    <LinearGradient colors={[colors.bgDeep, "rgba(7,11,16,0)"]} style={styles.header}>
      <View style={styles.row}>
        {back ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.back}>
            <ChevronLeft color={colors.textPrimary} size={22} />
          </Pressable>
        ) : null}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  row: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  back: { alignItems: "center", backgroundColor: colors.bgCard, borderRadius: 14, height: 44, justifyContent: "center", width: 44 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: "900" },
  subtitle: { color: colors.textMuted, marginTop: 2 },
});

export default GradientHeader;
