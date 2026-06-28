import { create } from "zustand";
import type { ParsedSmsPayment } from "@/types/sms";

type SmsState = {
  queue: ParsedSmsPayment[];
  add: (payment: ParsedSmsPayment) => void;
  removeFirst: () => void;
  clear: () => void;
};

export const useSmsStore = create<SmsState>((set) => ({
  queue: [],
  add: (payment) => set((state) => ({ queue: [...state.queue, payment] })),
  removeFirst: () => set((state) => ({ queue: state.queue.slice(1) })),
  clear: () => set({ queue: [] }),
}));
