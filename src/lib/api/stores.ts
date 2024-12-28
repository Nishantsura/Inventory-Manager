import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type Store = Database["public"]["Tables"]["stores"]["Row"];
export type StoreInsert = Database["public"]["Tables"]["stores"]["Insert"];
export type StoreUpdate = Database["public"]["Tables"]["stores"]["Update"];

export const getStores = async () => {
  const { data, error } = await supabase.from("stores").select(`
      *,
      users!stores_manager_id_fkey (*)
    `);
  if (error) throw error;
  return data;
};

export const createStore = async (store: StoreInsert) => {
  const { data, error } = await supabase
    .from("stores")
    .insert(store)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateStore = async (id: string, store: StoreUpdate) => {
  const { data, error } = await supabase
    .from("stores")
    .update(store)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteStore = async (id: string) => {
  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) throw error;
};
