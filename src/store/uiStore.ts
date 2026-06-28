import { create } from "zustand";

type Toast = { message: string; type: "success" | "error" | "info" } | null;

type UiState = {
  balanceHidden: boolean;
  toast: Toast;
  toggleBalanceHidden: () => void;
  showToast: (toast: Toast) => void;
};

export const useUiStore = create<UiState>((set) => ({
  balanceHidden: false,
  toast: null,
  toggleBalanceHidden: () => set((state) => ({ balanceHidden: !state.balanceHidden })),
  showToast: (toast) => set({ toast }),
}));
