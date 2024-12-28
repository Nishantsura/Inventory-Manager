import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit, Trash2, ShoppingCart } from "lucide-react";

interface InventoryItem {
  id: string;
  category: string;
  totalCost: number;
  inStock: number;
  blocked: number;
  purchased: number;
  manualAdj: number;
  shipped: number;
  returnTransit: number;
  postProcess: number;
  badStock: number;
  missing: number;
  store?: string;
}

interface InventoryGridProps {
  items?: InventoryItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onOrder?: (id: string) => void;
  selectedStore?: string;
}

const defaultItems: InventoryItem[] = [
  {
    id: "1",
    category: "books",
    totalCost: 3381201234.65,
    inStock: 10062120,
    blocked: 3084,
    purchased: 3832,
    manualAdj: 176415,
    shipped: 99432,
    returnTransit: 6118,
    postProcess: 9358,
    badStock: 1,
    missing: 0,
    store: "main",
  },
  {
    id: "2",
    category: "Default",
    totalCost: 1099.0,
    inStock: 2,
    blocked: 0,
    purchased: 0,
    manualAdj: 6,
    shipped: 4,
    returnTransit: 0,
    postProcess: 0,
    badStock: 0,
    missing: 0,
    store: "downtown",
  },
];

const InventoryGrid = ({
  items = defaultItems,
  onEdit = () => {},
  onDelete = () => {},
  onOrder = () => {},
  selectedStore = "all",
}: InventoryGridProps) => {
  const filteredItems =
    selectedStore === "all"
      ? items
      : items.filter((item) => item.store === selectedStore);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Blocked</TableHead>
            <TableHead>Purchased</TableHead>
            <TableHead>Manual Adj.</TableHead>
            <TableHead>Shipped</TableHead>
            <TableHead>Return Transit</TableHead>
            <TableHead>Post Process</TableHead>
            <TableHead>Bad Stock</TableHead>
            <TableHead>Missing</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell>
                ₹
                {item.totalCost.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>{item.inStock.toLocaleString()}</TableCell>
              <TableCell>{item.blocked.toLocaleString()}</TableCell>
              <TableCell>{item.purchased.toLocaleString()}</TableCell>
              <TableCell>{item.manualAdj.toLocaleString()}</TableCell>
              <TableCell>{item.shipped.toLocaleString()}</TableCell>
              <TableCell>{item.returnTransit.toLocaleString()}</TableCell>
              <TableCell>{item.postProcess.toLocaleString()}</TableCell>
              <TableCell>{item.badStock.toLocaleString()}</TableCell>
              <TableCell>{item.missing.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOrder(item.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
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

export default InventoryGrid;
