package expo.modules.smsexpensedetector

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SmsExpenseDetectorModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SmsExpenseDetector")
    Events("onSmsReceived")
    AsyncFunction("requestPermissionsAsync") {
      true
    }
    Function("startListening") {}
    Function("stopListening") {}
  }
}
