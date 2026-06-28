import { ReactNode, useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius, spacing } from "@/theme";

type AppInputProps = TextInputProps & {
  label: string;
  error?: string;
  success?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  characterCount?: boolean;
};

export function AppInput({ label, error, success, leftIcon, rightIcon, characterCount, value, ...props }: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.rose : success ? colors.success : focused ? colors.violet : colors.border;
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, (focused || Boolean(value)) && styles.labelActive]}>{label}</Text>
      <View style={[styles.inputWrap, { borderColor }]}>
        {leftIcon}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={value}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          {...props}
        />
        {rightIcon}
      </View>
      <View style={styles.metaRow}>
        {error ? <Text style={styles.error}>{error}</Text> : <Text style={styles.help}>{success ? "Looks good" : " "}</Text>}
        {characterCount ? <Text style={styles.help}>{String(value ?? "").length}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: "600" },
  labelActive: { color: colors.violetLight },
  inputWrap: {
    alignItems: "center",
    backgroundColor: colors.bgCard,
    borderRadius: radius.button,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  input: { color: colors.textPrimary, flex: 1, fontSize: 15, paddingVertical: spacing.md },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  error: { color: colors.rose, fontSize: 11 },
  help: { color: colors.textMuted, fontSize: 11 },
});

export default AppInput;
