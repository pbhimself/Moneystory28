import { requireNativeModule } from "expo-modules-core";
import type { SmsExpenseDetectorModuleEvents } from "./src/SmsExpenseDetector.types";

type SmsExpenseDetectorModule = {
  addListener<EventName extends keyof SmsExpenseDetectorModuleEvents>(
    eventName: EventName,
    listener: SmsExpenseDetectorModuleEvents[EventName],
  ): { remove: () => void };
  requestPermissionsAsync(): Promise<boolean>;
  startListening(): void;
  stopListening(): void;
};

export default requireNativeModule<SmsExpenseDetectorModule>("SmsExpenseDetector");
