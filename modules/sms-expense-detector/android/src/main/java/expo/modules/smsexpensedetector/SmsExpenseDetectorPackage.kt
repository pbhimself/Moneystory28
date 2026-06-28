package expo.modules.smsexpensedetector

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.ModulesProvider

class SmsExpenseDetectorPackage : ModulesProvider {
  override fun getModules(): List<Class<out Module>> = listOf(SmsExpenseDetectorModule::class.java)
}
