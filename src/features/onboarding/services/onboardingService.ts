import { supabase } from "@/lib/supabase";

export async function upsertSalarySettings(input: { user_id: string; monthly_salary_paise: number; fixed_monthly_expense_paise: number; salary_received_day: number; currency: string }) {
  const { data, error } = await supabase.from("salary_settings").upsert(input, { onConflict: "user_id" }).select("*").single();
  if (error) throw error;
  return data;
}

export async function upsertWeeklyTarget(input: { user_id: string; week_start: string; target_amount_paise: number; currency: string }) {
  const { data, error } = await supabase.from("weekly_targets").upsert(input, { onConflict: "user_id,week_start" }).select("*").single();
  if (error) throw error;
  return data;
}

export async function completeOnboarding(userId: string) {
  const { data, error } = await supabase.from("profiles").update({ onboarding_completed: true, onboarding_step: 4 }).eq("id", userId).select("*").single();
  if (error) throw error;
  return data;
}
