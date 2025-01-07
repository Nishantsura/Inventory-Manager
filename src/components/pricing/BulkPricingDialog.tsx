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

interface BulkPricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  categories: string[];
}

export function BulkPricingDialog({
  open,
  onOpenChange,
  onSubmit,
  categories,
}: BulkPricingDialogProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      category: "",
      discountType: "percentage",
      discountValue: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Pricing Update</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) =>
                register("category").onChange({ target: { value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Discount Type</Label>
            <Select
              onValueChange={(value) =>
                register("discountType").onChange({ target: { value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Discount Value</Label>
            <Input
              type="number"
              {...register("discountValue")}
              placeholder="Enter discount value"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Price</Label>
              <Input
                type="number"
                {...register("minPrice")}
                placeholder="Minimum price"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Price</Label>
              <Input
                type="number"
                {...register("maxPrice")}
                placeholder="Maximum price"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Apply Pricing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
