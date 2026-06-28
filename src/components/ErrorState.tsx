import { AlertCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "@/components/AppButton";
import { colors, spacing } from "@/theme";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.wrap}>
      <AlertCircle color={colors.danger} size={36} />
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <AppButton label="Retry" variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: spacing.md, padding: spacing.xl },
  message: { color: colors.textSecondary, textAlign: "center" },
});

export default ErrorState;
