import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing } from "@/theme";

type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
  height?: number;
};

export function ProgressBar({ value, max, label, height = 10 }: ProgressBarProps) {
  const percent = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.track, { height }]}>
        <LinearGradient colors={[colors.violet, colors.rose]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: "600" },
  track: { backgroundColor: colors.bgOverlay, borderRadius: radius.pill, overflow: "hidden" },
  fill: { borderRadius: radius.pill, height: "100%" },
});

export default ProgressBar;
