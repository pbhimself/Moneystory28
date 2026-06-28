import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing } from "@/theme";

export function LoadingSkeleton({ variant = "expense" }: { variant?: "balance" | "expense" | "chart" | "category" }) {
  const height = variant === "balance" ? 220 : variant === "chart" ? 180 : variant === "category" ? 56 : 76;
  return (
    <View style={[styles.box, { height }]}>
      <LinearGradient colors={[colors.bgCard, colors.bgOverlay, colors.bgCard]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: radius.card, marginVertical: spacing.xs, overflow: "hidden" },
});

export default LoadingSkeleton;
