import React from "react";
import SummaryCards from "./dashboard/SummaryCards";
import SearchToolbar from "./dashboard/SearchToolbar";
import InventoryGrid from "./dashboard/InventoryGrid";
import AnalyticsSection from "./dashboard/AnalyticsSection";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DashboardLayout } from "./layout/DashboardLayout";

interface HomeProps {
  onAddNewBook?: () => void;
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: any) => void;
  onEditBook?: (id: string) => void;
  onDeleteBook?: (id: string) => void;
  onOrderBook?: (id: string) => void;
}

const Home = ({
  onAddNewBook = () => {},
  onSearch = () => {},
  onFilterChange = () => {},
  onEditBook = () => {},
  onDeleteBook = () => {},
  onOrderBook = () => {},
}: HomeProps) => {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
          <Button onClick={onAddNewBook} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Book
          </Button>
        </div>

        <SummaryCards
          totalValue={125000}
          lowStockCount={12}
          bestsellerCount={25}
        />

        <SearchToolbar onSearch={onSearch} onFilterChange={onFilterChange} />

        <InventoryGrid
          onEdit={onEditBook}
          onDelete={onDeleteBook}
          onOrder={onOrderBook}
        />

        <AnalyticsSection />
      </div>
    </DashboardLayout>
  );
};

export default Home;
