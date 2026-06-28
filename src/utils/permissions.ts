import { Linking, PermissionsAndroid, Platform } from "react-native";

export async function requestSmsPermissions(): Promise<"granted" | "denied" | "unavailable"> {
  if (Platform.OS !== "android") {
    return "unavailable";
  }
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
  ]);
  return Object.values(result).every((value) => value === PermissionsAndroid.RESULTS.GRANTED) ? "granted" : "denied";
}

export function openAppSettings(): Promise<void> {
  return Linking.openSettings();
}
