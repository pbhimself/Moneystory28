import { supabase } from "@/lib/supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, values: { full_name?: string; preferred_currency?: string; onboarding_completed?: boolean; onboarding_step?: number }) {
  const { data, error } = await supabase.from("profiles").update(values).eq("id", userId).select("*").single();
  if (error) throw error;
  return data;
}
