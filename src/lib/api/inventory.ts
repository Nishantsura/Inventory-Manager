import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type Inventory = Database["public"]["Tables"]["inventory"]["Row"];
export type InventoryInsert =
  Database["public"]["Tables"]["inventory"]["Insert"];
export type InventoryUpdate =
  Database["public"]["Tables"]["inventory"]["Update"];

export const getInventory = async (storeId?: string) => {
  let query = supabase.from("inventory").select(`
      *,
      books (*),
      stores (*)
    `);

  if (storeId) {
    query = query.eq("store_id", storeId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateInventoryQuantity = async (id: string, quantity: number) => {
  const { data, error } = await supabase
    .from("inventory")
    .update({ quantity })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const createInventoryItem = async (item: InventoryInsert) => {
  const { data, error } = await supabase
    .from("inventory")
    .insert(item)
    .select()
    .single();
  if (error) throw error;
  return data;
};
