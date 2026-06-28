import { Link, router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import GradientHeader from "@/components/GradientHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { colors } from "@/theme";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  return (
    <ScreenContainer>
      <GradientHeader title="Sign in" subtitle="Continue your MoneyStory" back />
      <AppInput label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <AppInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {signIn.error ? <Text style={{ color: colors.danger }}>{signIn.error.message}</Text> : null}
      <AppButton label="Sign in" loading={signIn.isPending} onPress={() => signIn.mutate({ email, password }, { onSuccess: () => router.replace("/") })} />
      <Link href="/(auth)/forgot-password" style={{ color: colors.violetLight }}>Forgot password?</Link>
    </ScreenContainer>
  );
}
