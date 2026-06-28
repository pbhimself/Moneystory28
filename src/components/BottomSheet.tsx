import { Modal, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { PropsWithChildren } from "react";
import { colors, radius, spacing } from "@/theme";

type BottomSheetProps = PropsWithChildren<{ visible: boolean; onClose: () => void }>;

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <Pressable accessibilityLabel="Close bottom sheet" style={styles.backdrop} onPress={onClose}>
        <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} />
      </Pressable>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.38)" },
  sheet: { backgroundColor: colors.bgElevated, borderTopLeftRadius: radius.cardLarge, borderTopRightRadius: radius.cardLarge, bottom: 0, gap: spacing.lg, left: 0, padding: spacing.xl, position: "absolute", right: 0 },
  handle: { alignSelf: "center", backgroundColor: colors.textDisabled, borderRadius: radius.pill, height: 4, width: 48 },
});

export default BottomSheet;
