import { Modal, StyleSheet, Text, View } from "react-native";
import AppButton from "@/components/AppButton";
import { colors, radius, spacing } from "@/theme";

export function ConfirmDialog({ visible, title, message, onCancel, onConfirm }: { visible: boolean; title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <AppButton label="Cancel" variant="secondary" onPress={onCancel} />
            <AppButton label="Confirm" variant="danger" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { alignItems: "center", backgroundColor: "rgba(0,0,0,0.55)", flex: 1, justifyContent: "center", padding: spacing.lg },
  card: { backgroundColor: colors.bgElevated, borderColor: colors.border, borderRadius: radius.card, borderWidth: 1, gap: spacing.lg, padding: spacing.xl, width: "100%" },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: "800" },
  message: { color: colors.textSecondary, lineHeight: 21 },
  actions: { flexDirection: "row", gap: spacing.md, justifyContent: "flex-end" },
});

export default ConfirmDialog;
