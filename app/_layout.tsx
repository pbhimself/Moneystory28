import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSession } from "@/features/auth/hooks/useSession";
import { missingSupabaseConfig } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";
import { colors } from "@/theme";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function RootStack() {
  const { initialized } = useSession();
  useEffect(() => {
    if (initialized) SplashScreen.hideAsync().catch(() => undefined);
  }, [initialized]);
  if (!initialized) return null;
  return (
    <>
      {missingSupabaseConfig ? (
        <View style={{ backgroundColor: colors.danger, padding: 10 }}>
          <Text style={{ color: colors.textPrimary, textAlign: "center" }}>Missing Supabase environment variables.</Text>
        </View>
      ) : null}
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgDeep } }} />
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootStack />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
