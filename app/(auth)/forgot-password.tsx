import { useState } from "react";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { colors } from "@/theme";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  return (
    <ScreenContainer>
      <GradientHeader title="Reset password" subtitle="We will send a secure link" back />
      <AppInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <AppButton label="Send reset link" loading={resetPassword.isPending} onPress={() => resetPassword.mutate(email)} />
      {resetPassword.isSuccess ? <Text style={{ color: colors.success }}>Reset link sent.</Text> : null}
    </ScreenContainer>
  );
}
