import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchToolbarProps {
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filters: { category: string; stockStatus: string }) => void;
  selectedStore?: string;
}

const SearchToolbar = ({
  onSearch = () => {},
  onFilterChange = () => {},
  selectedStore = "all",
}: SearchToolbarProps) => {
  return (
    <div className="w-full h-20 bg-white border-b p-4 flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10 w-full"
          placeholder="Search by title, author, or ISBN..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Select
        defaultValue="all-categories"
        onValueChange={(value) =>
          onFilterChange({
            category: value,
            stockStatus: "all",
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-categories">All Categories</SelectItem>
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
          <SelectItem value="children">Children's Books</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue="all"
        onValueChange={(value) =>
          onFilterChange({
            category: "all-categories",
            stockStatus: value,
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stock Status</SelectItem>
          <SelectItem value="in-stock">In Stock</SelectItem>
          <SelectItem value="low-stock">Low Stock</SelectItem>
          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchToolbar;
