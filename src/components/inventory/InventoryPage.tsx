import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Search, Download, Upload, MapPin, Filter } from "lucide-react";
import { mockInventory, mockBooks, mockStores } from "@/lib/mock-data";
import { RackSpaceDialog } from "./RackSpaceDialog";
import { useToast } from "@/components/ui/use-toast";

type InventoryItem = (typeof mockInventory)[0] & {
  book?: (typeof mockBooks)[0];
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rackSpaceDialog, setRackSpaceDialog] = useState({
    open: false,
    inventoryId: "",
    currentLocation: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const enrichedInventory = mockInventory.map((item) => ({
        ...item,
        book: mockBooks.find((b) => b.id === item.book_id),
      }));
      setInventory(enrichedInventory);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRackSpaceAssignment = async (data: any) => {
    try {
      const location = `${data.section}-${data.aisle}-R${data.rack}-S${data.shelf}-${data.slot}`;
      const updatedInventory = inventory.map((item) =>
        item.id === rackSpaceDialog.inventoryId
          ? { ...item, rack_location: location }
          : item,
      );
      setInventory(updatedInventory);
      setRackSpaceDialog({ open: false, inventoryId: "", currentLocation: "" });
      toast({
        title: "Success",
        description: "Rack space assigned successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to assign rack space",
        variant: "destructive",
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredInventory = inventory.filter((item) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "in-stock" && item.quantity > 0) ||
      (selectedTab === "out-of-stock" && item.quantity === 0) ||
      (selectedTab === "over-sold" && item.quantity < 0);

    const matchesStore =
      selectedStore === "all" || item.store_id === selectedStore;

    const matchesCategory =
      selectedCategory === "all" || item.book?.category === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      item.book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.book?.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.book?.isbn.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesStore && matchesCategory && matchesSearch;
  });

  const categories = Array.from(
    new Set(mockBooks.map((book) => book.category)),
  );

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        {/* Header Message */}
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2">
          <span>
            From now on, you will see order data for "DEFAULT 37522" only.
          </span>
        </div>

        {/* Store Selection and Filters */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-[200px]">
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

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
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

          <div className="flex gap-2">
            <Input
              placeholder="Search inventory..."
              className="w-[300px]"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" /> Import
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue={selectedTab}
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-stock">In Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
            <TabsTrigger value="over-sold">Over Sold Inventory</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="w-[200px]">
                  <div className="flex items-center gap-2">
                    SKU CODE
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    NAME
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>IS COMBO</TableHead>
                <TableHead>SYNC MODE</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    PRODUCT CATEGORY
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    PACKAGE TYPE
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    PRODUCT GROUP
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    SKU UPC
                    <Search className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>IN STOCK</TableHead>
                <TableHead>BLOCKED</TableHead>
                <TableHead>BUFFER STOCK</TableHead>
                <TableHead>RACK LOCATION</TableHead>
                <TableHead>WEIGHT</TableHead>
                <TableHead>LAST PURCHASE PRICE</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={
                        item.book?.cover_image ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=50&h=50&fit=crop"
                      }
                      alt={item.book?.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{item.book?.sku || "-"}</TableCell>
                  <TableCell>{item.book?.title || "-"}</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Default</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {item.book?.category || "books"}
                    </Badge>
                  </TableCell>
                  <TableCell>L30W23H2</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{item.book?.isbn || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.quantity > 0 ? "default" : "destructive"}
                    >
                      {item.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() =>
                        setRackSpaceDialog({
                          open: true,
                          inventoryId: item.id,
                          currentLocation: item.rack_location,
                        })
                      }
                    >
                      <MapPin className="h-4 w-4" />
                      {item.rack_location || "Assign"}
                    </Button>
                  </TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>
                    ₹{item.book?.price.toFixed(2) || "0.00"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <RackSpaceDialog
          open={rackSpaceDialog.open}
          onOpenChange={(open) =>
            setRackSpaceDialog({ open, inventoryId: "", currentLocation: "" })
          }
          onSubmit={handleRackSpaceAssignment}
          currentLocation={rackSpaceDialog.currentLocation}
        />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
