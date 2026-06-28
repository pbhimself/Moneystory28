import type { ExpoConfig } from "expo/config";

const enableSms = process.env.EXPO_PUBLIC_ENABLE_SMS_DETECTION === "true";

const config: ExpoConfig = {
  name: "MoneyStory",
  slug: "moneystory",
  version: "1.0.0",
  scheme: "moneystory",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#070B10",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.moneystory.app",
  },
  android: {
    package: "com.moneystory.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#070B10",
    },
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-font",
    ...(enableSms ? ["./modules/sms-expense-detector/plugin/src"] : []),
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "721ec055-df96-4b7d-b6bb-5361e91c9424",
    },
  },
};

export default config;
