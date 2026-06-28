import { useMutation } from "@tanstack/react-query";
import * as authService from "@/features/auth/services/authService";

export function useAuth() {
  return {
    signIn: useMutation({ mutationFn: (input: { email: string; password: string }) => authService.signIn(input.email, input.password) }),
    signUp: useMutation({ mutationFn: (input: { email: string; password: string; fullName: string }) => authService.signUp(input.email, input.password, input.fullName) }),
    signOut: useMutation({ mutationFn: authService.signOut }),
    resetPassword: useMutation({ mutationFn: authService.requestPasswordReset }),
    updatePassword: useMutation({ mutationFn: authService.updatePassword }),
  };
}
