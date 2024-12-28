import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package } from "lucide-react";

interface Store {
  id: string;
  name: string;
  address: string;
  manager: string;
  totalItems: number;
  status: "active" | "inactive";
}

interface StoresGridProps {
  stores?: Store[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewInventory?: (id: string) => void;
}

const defaultStores: Store[] = [
  {
    id: "1",
    name: "Main Store",
    address: "123 Main St, City",
    manager: "John Doe",
    totalItems: 1500,
    status: "active",
  },
  {
    id: "2",
    name: "Downtown Branch",
    address: "456 Market St, City",
    manager: "Jane Smith",
    totalItems: 800,
    status: "active",
  },
];

const StoresGrid = ({
  stores = defaultStores,
  onEdit = () => {},
  onDelete = () => {},
  onViewInventory = () => {},
}: StoresGridProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.manager}</TableCell>
              <TableCell>{store.totalItems}</TableCell>
              <TableCell>
                <Badge
                  variant={store.status === "active" ? "default" : "secondary"}
                >
                  {store.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(store.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(store.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewInventory(store.id)}
                  >
                    <Package className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoresGrid;
