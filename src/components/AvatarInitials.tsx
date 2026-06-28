import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius } from "@/theme";

export function AvatarInitials({ name, notification }: { name: string; notification?: boolean }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "MS";
  return (
    <LinearGradient colors={[colors.violet, colors.cyan]} style={styles.avatar}>
      <Text style={styles.text}>{initials}</Text>
      {notification ? <View style={styles.dot} /> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: "center", borderRadius: radius.pill, height: 44, justifyContent: "center", width: 44 },
  text: { color: colors.textPrimary, fontWeight: "900" },
  dot: { backgroundColor: colors.rose, borderColor: colors.bgDeep, borderRadius: 6, borderWidth: 2, height: 12, position: "absolute", right: 0, top: 0, width: 12 },
});

export default AvatarInitials;
