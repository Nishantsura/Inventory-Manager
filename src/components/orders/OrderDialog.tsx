import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBooks } from "@/lib/api/books";
import type { Book } from "@/lib/api/books";
import type { OrderInsert, OrderItemInsert } from "@/lib/api/orders";

interface OrderFormData extends OrderInsert {
  items: Array<{
    book_id: string;
    quantity: number;
    unit_price: number;
  }>;
}

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (order: OrderInsert, items: OrderItemInsert[]) => void;
}

export function OrderDialog({
  open,
  onOpenChange,
  onSubmit,
}: OrderDialogProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<OrderFormData>({
      defaultValues: {
        supplier: "",
        notes: "",
        items: [
          {
            book_id: "",
            quantity: 1,
            unit_price: 0,
          },
        ],
      },
    });

  const items = watch("items");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    };

    if (open) {
      loadBooks();
    }
  }, [open]);

  const addItem = () => {
    setValue("items", [
      ...items,
      {
        book_id: "",
        quantity: 1,
        unit_price: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setValue(
      "items",
      items.filter((_, i) => i !== index),
    );
  };

  const updateQuantity = (index: number, delta: number) => {
    const newQuantity = Math.max(1, items[index].quantity + delta);
    const newItems = [...items];
    newItems[index].quantity = newQuantity;
    setValue("items", newItems);
  };

  const onSubmitForm = async (data: OrderFormData) => {
    try {
      setLoading(true);
      await onSubmit(data, data.items);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              {...register("supplier")}
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Order Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Book</Label>
                  <Select
                    value={item.book_id}
                    onValueChange={(value) => {
                      const book = books.find((b) => b.id === value);
                      const newItems = [...items];
                      newItems[index] = {
                        ...newItems[index],
                        book_id: value,
                        unit_price: book?.price || 0,
                      };
                      setValue("items", newItems);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select book" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title} (${book.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-32 space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      {...register(`items.${index}.quantity` as const, {
                        valueAsNumber: true,
                      })}
                      className="w-20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="w-32 space-y-2">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register(`items.${index}.unit_price` as const, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any additional notes..."
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
