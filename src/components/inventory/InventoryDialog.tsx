import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface InventoryFormData {
  book_id: string;
  store_id: string;
  quantity: number;
  min_stock_level: number;
  max_stock_level: number;
}

interface InventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InventoryFormData) => void;
  initialData?: Partial<InventoryFormData>;
  mode: "create" | "edit";
  books: Array<{ id: string; title: string }>;
  stores: Array<{ id: string; name: string }>;
}

export function InventoryDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
  books,
  stores,
}: InventoryDialogProps) {
  const { register, handleSubmit, reset } = useForm<InventoryFormData>({
    defaultValues: initialData || {
      book_id: "",
      store_id: "",
      quantity: 0,
      min_stock_level: 10,
      max_stock_level: 100,
    },
  });

  const onSubmitForm = (data: InventoryFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Inventory Item" : "Edit Inventory Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="book_id">Book</Label>
              <Select
                defaultValue={initialData?.book_id}
                onValueChange={(value) =>
                  register("book_id").onChange({ target: { value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  {books.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store_id">Store</Label>
              <Select
                defaultValue={initialData?.store_id}
                onValueChange={(value) =>
                  register("store_id").onChange({ target: { value } })
                }
              >
                <SelectTrigger>
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min_stock_level">Min Stock Level</Label>
              <Input
                id="min_stock_level"
                type="number"
                {...register("min_stock_level", { valueAsNumber: true })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_stock_level">Max Stock Level</Label>
              <Input
                id="max_stock_level"
                type="number"
                {...register("max_stock_level", { valueAsNumber: true })}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {mode === "create" ? "Add Item" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
