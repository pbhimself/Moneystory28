import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/database";

export async function listCategories(userId: string) {
  const { data, error } = await supabase.from("categories").select("*").eq("user_id", userId).order("sort_order");
  if (error) throw error;
  return data;
}

export async function createCategory(input: Tables["categories"]["Insert"]) {
  const { data, error } = await supabase.from("categories").insert(input).select("*").single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string, userId: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}
