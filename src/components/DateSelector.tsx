import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "@/theme";

export function DateSelector({ value, onChange }: { value: Date; onChange: (date: Date) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel="Select date" onPress={() => setOpen(true)} style={styles.button}>
        <Calendar color={colors.violetLight} size={18} />
        <Text style={styles.text}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value)}</Text>
      </Pressable>
      {open ? (
        <DateTimePicker
          value={value}
          mode="datetime"
          onChange={(_, selected) => {
            setOpen(false);
            if (selected) onChange(selected);
          }}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", backgroundColor: colors.bgCard, borderColor: colors.border, borderRadius: radius.button, borderWidth: 1, flexDirection: "row", gap: spacing.sm, minHeight: 50, paddingHorizontal: spacing.md },
  text: { color: colors.textPrimary, fontWeight: "700" },
});

export default DateSelector;
