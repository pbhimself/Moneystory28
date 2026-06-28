import { PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors, radius, spacing } from "@/theme";

type AppButtonProps = PropsWithChildren<{
  label?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AppButton({
  label,
  children,
  variant = "primary",
  loading,
  disabled,
  fullWidth,
  onPress,
  style,
  accessibilityLabel,
}: AppButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={colors.textPrimary} /> : <Text style={styles.label}>{children ?? label}</Text>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radius.button,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  primary: { backgroundColor: colors.violet },
  secondary: { backgroundColor: colors.transparent, borderColor: colors.violet, borderWidth: 1 },
  ghost: { backgroundColor: colors.transparent },
  danger: { backgroundColor: colors.danger },
  fullWidth: { width: "100%" },
  disabled: { opacity: 0.45 },
  label: { color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
});

export default AppButton;
