import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

export function useSession() {
  const { session, initialized, setInitialized, setSession } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitialized(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setInitialized(true);
    });
    return () => data.subscription.unsubscribe();
  }, [setInitialized, setSession]);
  return { session, initialized };
}
