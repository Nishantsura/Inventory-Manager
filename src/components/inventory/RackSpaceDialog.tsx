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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  rackSpaceSchema,
  type RackSpaceFormData,
} from "@/lib/validations/rack-space";

interface RackSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RackSpaceFormData) => void;
  initialData?: Partial<RackSpaceFormData>;
  currentLocation?: string;
}

export function RackSpaceDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  currentLocation,
}: RackSpaceDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RackSpaceFormData>({
    resolver: zodResolver(rackSpaceSchema),
    defaultValues: initialData || {
      section: "",
      aisle: "",
      rack: "",
      shelf: "",
      slot: "",
      notes: "",
    },
  });

  const onSubmitForm = async (data: RackSpaceFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Rack Space</DialogTitle>
          {currentLocation && (
            <p className="text-sm text-muted-foreground">
              Current Location: {currentLocation}
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                placeholder="e.g., A"
                {...register("section")}
                error={errors.section?.message}
              />
              {errors.section && (
                <p className="text-sm text-destructive">
                  {errors.section.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="aisle">Aisle</Label>
              <Input
                id="aisle"
                placeholder="e.g., 02"
                {...register("aisle")}
                error={errors.aisle?.message}
              />
              {errors.aisle && (
                <p className="text-sm text-destructive">
                  {errors.aisle.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rack">Rack</Label>
              <Input
                id="rack"
                placeholder="e.g., 3"
                {...register("rack")}
                error={errors.rack?.message}
              />
              {errors.rack && (
                <p className="text-sm text-destructive">
                  {errors.rack.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shelf">Shelf</Label>
              <Input
                id="shelf"
                placeholder="e.g., 4"
                {...register("shelf")}
                error={errors.shelf?.message}
              />
              {errors.shelf && (
                <p className="text-sm text-destructive">
                  {errors.shelf.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slot">Slot</Label>
              <Input
                id="slot"
                placeholder="e.g., 05"
                {...register("slot")}
                error={errors.slot?.message}
              />
              {errors.slot && (
                <p className="text-sm text-destructive">
                  {errors.slot.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this location..."
              {...register("notes")}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Assigning..." : "Assign Location"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
