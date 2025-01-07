import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type RackLocation =
  Database["public"]["Tables"]["rack_locations"]["Row"];
export type RackLocationInsert =
  Database["public"]["Tables"]["rack_locations"]["Insert"];

export type InventoryLocation =
  Database["public"]["Tables"]["inventory_locations"]["Row"];
export type InventoryLocationInsert =
  Database["public"]["Tables"]["inventory_locations"]["Insert"];

export const getRackLocation = async (inventoryId: string) => {
  const { data, error } = await supabase
    .from("inventory_locations")
    .select(
      `
      *,
      rack_locations (*)
    `,
    )
    .eq("inventory_id", inventoryId)
    .single();

  if (error) throw error;
  return data;
};

export const assignRackLocation = async (
  inventoryId: string,
  rackLocationId: string,
  notes?: string,
) => {
  const { data, error } = await supabase.rpc("assign_rack_location", {
    p_inventory_id: inventoryId,
    p_rack_location_id: rackLocationId,
    p_assigned_by: (await supabase.auth.getUser()).data.user?.id,
    p_notes: notes,
  });

  // Refresh the rack location data after assignment
  if (error) throw error;
  return data;
};

export const getAvailableRackLocations = async (storeId: string) => {
  const { data, error } = await supabase
    .from("rack_locations")
    .select()
    .eq("store_id", storeId)
    .eq("status", "available");

  if (error) throw error;
  return data;
};

export const createRackLocation = async (location: RackLocationInsert) => {
  const { data, error } = await supabase
    .from("rack_locations")
    .insert(location)
    .select("*")
    .single();

  if (error) throw error;
  return data;
};
