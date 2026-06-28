import { router } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { updatePassword } = useAuth();
  return (
    <ScreenContainer>
      <GradientHeader title="New password" back />
      <AppInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <AppButton label="Update password" loading={updatePassword.isPending} onPress={() => updatePassword.mutate(password, { onSuccess: () => router.replace("/") })} />
    </ScreenContainer>
  );
}
