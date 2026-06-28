import { useMutation } from "@tanstack/react-query";
import { parsePaymentSms } from "@/features/sms/parser";
import { createSmsFingerprint, hasSmsFingerprint, saveSmsFingerprint } from "@/features/sms/fingerprint";
import { useSmsStore } from "@/store/smsStore";

export function useSmsDetection() {
  const add = useSmsStore((state) => state.add);
  return useMutation({
    mutationFn: async (raw: string) => {
      const parsed = parsePaymentSms(raw);
      if (!parsed) return null;
      const fingerprint = await createSmsFingerprint(raw);
      if (await hasSmsFingerprint(fingerprint)) return null;
      await saveSmsFingerprint(fingerprint);
      add(parsed);
      return parsed;
    },
  });
}
