import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/database";

export async function listExpenses(userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("expense_date", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data;
}

export async function getExpense(id: string, userId: string) {
  const { data, error } = await supabase.from("expenses").select("*").eq("id", id).eq("user_id", userId).single();
  if (error) throw error;
  return data;
}

export async function createExpense(input: Tables["expenses"]["Insert"]) {
  const { data, error } = await supabase.from("expenses").insert(input).select("*").single();
  if (error) throw error;
  return data;
}

export async function updateExpense(id: string, userId: string, input: Tables["expenses"]["Update"]) {
  const { data, error } = await supabase.from("expenses").update(input).eq("id", id).eq("user_id", userId).select("*").single();
  if (error) throw error;
  return data;
}

export async function deleteExpense(id: string, userId: string) {
  const { error } = await supabase.from("expenses").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}
