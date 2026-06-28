import { Tabs } from "expo-router";
import { ChartPie, Home, PlusCircle, ReceiptText, User } from "lucide-react-native";
import { colors } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.violetLight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.bgBase, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color }) => <Home color={color} size={20} /> }} />
      <Tabs.Screen name="expenses" options={{ title: "Expenses", tabBarIcon: ({ color }) => <ReceiptText color={color} size={20} /> }} />
      <Tabs.Screen name="add-expense" options={{ title: "Add", tabBarIcon: ({ color }) => <PlusCircle color={color} size={22} /> }} />
      <Tabs.Screen name="insights" options={{ title: "Insights", tabBarIcon: ({ color }) => <ChartPie color={color} size={20} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <User color={color} size={20} /> }} />
    </Tabs>
  );
}
