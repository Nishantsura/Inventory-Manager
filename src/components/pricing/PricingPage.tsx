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
import { Search, Download, Upload, Percent, Tags } from "lucide-react";
import { mockBooks, mockStores } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";
import { BulkPricingDialog } from "./BulkPricingDialog";

const PricingPage = () => {
  const [books, setBooks] = useState(mockBooks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkPricingOpen, setBulkPricingOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handlePriceUpdate = (bookId: string, newPrice: number) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, price: newPrice } : book,
      ),
    );
    toast({
      title: "Success",
      description: "Price updated successfully",
    });
  };

  const handleBulkPricing = (data: any) => {
    // Handle bulk pricing updates
    toast({
      title: "Success",
      description: `Updated prices for ${data.category} with ${data.discountType} ${data.discountValue}%`,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredBooks = books.filter((book) => {
    const matchesStore =
      selectedStore === "all" || book.store_id === selectedStore;
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStore && matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(books.map((book) => book.category)));

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pricing Management</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setBulkPricingOpen(true)}
              className="flex items-center gap-2"
            >
              <Percent className="h-4 w-4" />
              Bulk Pricing
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" /> Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

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

          <Input
            placeholder="Search books..."
            className="w-[300px]"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card className="bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <img
                      src={
                        book.cover_image ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=50&h=50&fit=crop"
                      }
                      alt={book.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{book.sku}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.category}</Badge>
                  </TableCell>
                  <TableCell>₹{book.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue="0"
                      className="w-20"
                    />
                    <span className="ml-1">%</span>
                  </TableCell>
                  <TableCell>₹{book.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500"
                      onClick={() => handlePriceUpdate(book.id, book.price)}
                    >
                      <Tags className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <BulkPricingDialog
          open={bulkPricingOpen}
          onOpenChange={setBulkPricingOpen}
          onSubmit={handleBulkPricing}
          categories={categories}
        />
      </div>
    </DashboardLayout>
  );
};

export default PricingPage;
