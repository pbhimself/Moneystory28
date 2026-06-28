import { StyleSheet, Text, TextStyle } from "react-native";
import { formatCurrency } from "@/lib/currency";
import { colors } from "@/theme";

type CurrencyTextProps = {
  paise: number;
  currency?: string;
  size?: "micro" | "body" | "title" | "hero";
  color?: string;
  style?: TextStyle;
};

export function CurrencyText({ paise, currency = "INR", size = "body", color = colors.textPrimary, style }: CurrencyTextProps) {
  return <Text style={[styles[size], { color }, style]}>{formatCurrency(paise, currency)}</Text>;
}

const styles = StyleSheet.create({
  micro: { fontSize: 10, fontWeight: "600" },
  body: { fontSize: 14, fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "800" },
  hero: { fontSize: 42, fontWeight: "800", letterSpacing: 0 },
});

export default CurrencyText;
