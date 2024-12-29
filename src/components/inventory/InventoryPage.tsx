import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Upload, Download, Search, Filter } from "lucide-react";
import { mockInventory, mockBooks, mockStores } from "@/lib/mock-data";
import { InventoryDialog } from "./InventoryDialog";

type InventoryItem = (typeof mockInventory)[0] & {
  book?: (typeof mockBooks)[0];
  store?: (typeof mockStores)[0];
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const enrichedInventory = mockInventory.map((item) => ({
      ...item,
      book: mockBooks.find((b) => b.id === item.book_id),
      store: mockStores.find((s) => s.id === item.store_id),
    }));
    setInventory(enrichedInventory);
  }, []);

  const handleCreateInventory = (data: any) => {
    const newItem = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status:
        data.quantity <= data.min_stock_level
          ? "low_stock"
          : data.quantity >= data.max_stock_level
            ? "overstocked"
            : "in_stock",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setInventory([...inventory, newItem]);
    setDialogOpen(false);
  };

  const handleUpdateInventory = (data: any) => {
    if (!editingItem) return;
    const updatedInventory = inventory.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            ...data,
            status:
              data.quantity <= data.min_stock_level
                ? "low_stock"
                : data.quantity >= data.max_stock_level
                  ? "overstocked"
                  : "in_stock",
            updated_at: new Date().toISOString(),
          }
        : item,
    );
    setInventory(updatedInventory);
    setDialogOpen(false);
    setEditingItem(null);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.book?.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.book?.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStore =
      selectedStore === "all" || item.store_id === selectedStore;

    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesStore && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "default";
      case "low_stock":
        return "destructive";
      case "overstocked":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => setDialogOpen(true)}
            >
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
            <div className="text-2xl font-bold">{inventory.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </div>
            <div className="text-2xl font-bold text-destructive">
              {inventory.filter((item) => item.status === "low_stock").length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Overstocked Items
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {inventory.filter((item) => item.status === "overstocked").length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Value
            </div>
            <div className="text-2xl font-bold">
              $
              {inventory
                .reduce(
                  (sum, item) => sum + (item.book?.price || 0) * item.quantity,
                  0,
                )
                .toLocaleString()}
            </div>
          </Card>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by title, ISBN, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {mockStores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="overstocked">Overstocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Min Level</TableHead>
                <TableHead>Max Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.book?.title}
                  </TableCell>
                  <TableCell>{item.book?.sku}</TableCell>
                  <TableCell>{item.store?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.min_stock_level}</TableCell>
                  <TableCell>{item.max_stock_level}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.last_restock_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <InventoryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={editingItem ? handleUpdateInventory : handleCreateInventory}
          initialData={editingItem || undefined}
          mode={editingItem ? "edit" : "create"}
          books={mockBooks}
          stores={mockStores}
        />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
