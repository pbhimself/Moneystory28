import { NativeModule, requireNativeModule } from "expo";
import type { SmsExpenseDetectorModuleEvents } from "./src/SmsExpenseDetector.types";

declare class SmsExpenseDetectorModule extends NativeModule<SmsExpenseDetectorModuleEvents> {
  requestPermissionsAsync(): Promise<boolean>;
  startListening(): void;
  stopListening(): void;
}

export default requireNativeModule<SmsExpenseDetectorModule>("SmsExpenseDetector");
