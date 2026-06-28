import { AndroidConfig, ConfigPlugin, withAndroidManifest } from "expo/config-plugins";

const withSmsExpenseDetector: ConfigPlugin = (config) =>
  withAndroidManifest(config, (next) => {
    AndroidConfig.Permissions.addPermission(next.modResults, "android.permission.READ_SMS");
    AndroidConfig.Permissions.addPermission(next.modResults, "android.permission.RECEIVE_SMS");
    return next;
  });

export default withSmsExpenseDetector;
