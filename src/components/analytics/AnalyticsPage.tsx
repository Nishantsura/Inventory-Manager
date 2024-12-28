import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Monthly Sales
            </div>
            <div className="text-2xl font-bold">$12,345</div>
            <div className="text-sm text-green-600">+12.3% from last month</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Avg Order Value
            </div>
            <div className="text-2xl font-bold">$84.32</div>
            <div className="text-sm text-green-600">+5.1% from last month</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Orders
            </div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-red-600">-2.3% from last month</div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Inventory Distribution
            </h2>
            <AnalyticsSection />
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
            <AnalyticsSection />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
