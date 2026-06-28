import { useUiStore } from "@/store/uiStore";

export function useToast() {
  return useUiStore((state) => state.showToast);
}
