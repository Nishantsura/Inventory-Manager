import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import StoreStats from "./StoreStats";
import StoresGrid from "./StoresGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getStores, deleteStore } from "@/lib/api/stores";
import type { Store } from "@/lib/api/stores";

const StoresPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStores = async () => {
    try {
      const data = await getStores();
      setStores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleDeleteStore = async (id: string) => {
    try {
      await deleteStore(id);
      await loadStores(); // Reload the list
    } catch (err) {
      console.error("Failed to delete store:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Stores Management</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Store
          </Button>
        </div>

        <StoreStats
          totalStores={stores.length}
          totalManagers={stores.filter((s) => s.manager_id).length}
          totalInventory={0} // This would need a separate query
          lowStockStores={0} // This would need a separate query
        />

        <StoresGrid
          stores={stores.map((store) => ({
            id: store.id,
            name: store.name,
            address: store.address,
            manager: store.manager_id || "Unassigned",
            totalItems: 0, // This would need a separate query
            status: store.status,
          }))}
          onDelete={handleDeleteStore}
        />
      </div>
    </DashboardLayout>
  );
};

export default StoresPage;
