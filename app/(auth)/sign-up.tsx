import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { colors } from "@/theme";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  return (
    <ScreenContainer>
      <GradientHeader title="Create account" subtitle="Start tracking with confidence" back />
      <AppInput label="Full name" value={fullName} onChangeText={setFullName} />
      <AppInput label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <AppInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {signUp.error ? <Text style={{ color: colors.danger }}>{signUp.error.message}</Text> : null}
      <AppButton label="Create account" loading={signUp.isPending} onPress={() => signUp.mutate({ email, password, fullName }, { onSuccess: () => router.replace("/") })} />
    </ScreenContainer>
  );
}
