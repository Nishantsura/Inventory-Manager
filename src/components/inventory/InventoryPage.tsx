import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import SearchToolbar from "@/components/dashboard/SearchToolbar";
import InventoryGrid from "@/components/dashboard/InventoryGrid";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stores = [
  { id: "all", name: "All Stores" },
  { id: "main", name: "Main Store" },
  { id: "downtown", name: "Downtown Branch" },
  { id: "warehouse", name: "Warehouse" },
];

const InventoryPage = () => {
  const [selectedStore, setSelectedStore] = useState("all");

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Items
            </div>
            <div className="text-2xl font-bold">
              {selectedStore === "all" ? "2,345" : "876"}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Low Stock
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {selectedStore === "all" ? "18" : "5"}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Out of Stock
            </div>
            <div className="text-2xl font-bold text-red-600">
              {selectedStore === "all" ? "7" : "2"}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Value
            </div>
            <div className="text-2xl font-bold">
              ₹{selectedStore === "all" ? "34,567" : "12,345"}
            </div>
          </Card>
        </div>

        <SearchToolbar selectedStore={selectedStore} />
        <InventoryGrid selectedStore={selectedStore} />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
