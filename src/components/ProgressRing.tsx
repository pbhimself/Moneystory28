import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/theme";

type ProgressRingProps = { percent: number; size?: number; label?: string };

export function ProgressRing({ percent, size = 112, label = "Used" }: ProgressRingProps) {
  const stroke = 10;
  const radiusValue = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radiusValue;
  const clamped = Math.max(0, Math.min(percent, 140));
  const color = percent > 100 ? colors.danger : percent >= 80 ? colors.warning : colors.violet;
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={radiusValue} stroke={colors.bgOverlay} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radiusValue}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (circumference * clamped) / 100}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.percent}>{Math.round(percent)}%</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  center: { alignItems: "center", position: "absolute" },
  percent: { color: colors.textPrimary, fontSize: 20, fontWeight: "800" },
  label: { color: colors.textMuted, fontSize: 10, fontWeight: "600", textTransform: "uppercase" },
});

export default ProgressRing;
