import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select(`
      *,
      stores (*)
    `);
  if (error) throw error;
  return data;
};

export const createUser = async (user: UserInsert) => {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateUser = async (id: string, user: UserUpdate) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw error;
};
