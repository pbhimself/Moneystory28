import type { ParsedSmsPayment } from "@/types/sms";

const recent: ParsedSmsPayment[] = [];

export function pushSmsDetection(payment: ParsedSmsPayment) {
  recent.unshift(payment);
  recent.splice(5);
}

export function recentSmsDetections() {
  return [...recent];
}
