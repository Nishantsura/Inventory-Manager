import * as z from "zod";

export const rackSpaceSchema = z.object({
  section: z.string().min(1, "Section is required"),
  aisle: z.string().min(1, "Aisle is required"),
  rack: z.string().min(1, "Rack is required"),
  shelf: z.string().min(1, "Shelf is required"),
  slot: z.string().min(1, "Slot is required"),
  notes: z.string().optional(),
});

export type RackSpaceFormData = z.infer<typeof rackSpaceSchema>;
