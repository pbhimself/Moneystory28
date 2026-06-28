import { getSecureItem, setSecureItem } from "@/lib/storage";
import { sha256 } from "@/utils/crypto";

const prefix = "sms-fingerprint:";

export async function createSmsFingerprint(raw: string): Promise<string> {
  return sha256(raw);
}

export async function hasSmsFingerprint(fingerprint: string): Promise<boolean> {
  return Boolean(await getSecureItem(`${prefix}${fingerprint}`));
}

export async function saveSmsFingerprint(fingerprint: string): Promise<void> {
  await setSecureItem(`${prefix}${fingerprint}`, "1");
}
