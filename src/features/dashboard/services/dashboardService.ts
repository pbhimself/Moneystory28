import { supabase } from "@/lib/supabase";
import { startOfWeek } from "@/lib/dates";

export async function getDashboardData(userId: string) {
  const weekStart = startOfWeek(new Date()).toISOString().slice(0, 10);
  const [profile, salary, weekly, expenses] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("salary_settings").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("weekly_targets").select("*").eq("user_id", userId).eq("week_start", weekStart).maybeSingle(),
    supabase.from("expenses").select("*").eq("user_id", userId).order("expense_date", { ascending: false }).limit(50),
  ]);
  if (profile.error) throw profile.error;
  if (salary.error) throw salary.error;
  if (weekly.error) throw weekly.error;
  if (expenses.error) throw expenses.error;
  return { profile: profile.data, salary: salary.data, weekly: weekly.data, expenses: expenses.data };
}
