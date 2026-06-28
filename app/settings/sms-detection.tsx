import { Shield } from "lucide-react-native";
import { useState } from "react";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GlassCard from "@/components/GlassCard";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useSmsDetection } from "@/features/sms/hooks/useSmsDetection";
import { requestSmsPermissions } from "@/utils/permissions";
import { colors } from "@/theme";

export default function SmsDetectionSettings() {
  const [sms, setSms] = useState("");
  const [status, setStatus] = useState("Not requested");
  const detection = useSmsDetection();
  return (
    <ScreenContainer>
      <GradientHeader title="SMS detection" back />
      <GlassCard>
        <Shield color={colors.gold} size={28} />
        <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: "800", marginTop: 12 }}>Your privacy is protected</Text>
        <Text style={{ color: colors.textSecondary, lineHeight: 21, marginTop: 8 }}>MoneyStory reads payment messages only on your device. SMS content is never uploaded. Only a local fingerprint prevents duplicates.</Text>
      </GlassCard>
      <AppButton label="Enable payment SMS detection" onPress={() => requestSmsPermissions().then(setStatus)} />
      <Text style={{ color: colors.textMuted }}>Permission status: {status}</Text>
      <AppInput label="Paste SMS" value={sms} onChangeText={setSms} multiline characterCount />
      <AppButton label="Detect payment" loading={detection.isPending} onPress={() => detection.mutate(sms)} />
      {detection.data ? <Text style={{ color: colors.success }}>Payment detected: {detection.data.merchantName ?? "Unknown merchant"}</Text> : null}
    </ScreenContainer>
  );
}
