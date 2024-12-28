import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticsSectionProps {
  inventoryTrends?: {
    date: string;
    value: number;
  }[];
  locationDistribution?: {
    location: string;
    count: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsSection = ({
  inventoryTrends = [
    { date: "2024-01", value: 1200 },
    { date: "2024-02", value: 1500 },
    { date: "2024-03", value: 1300 },
  ],
  locationDistribution = [
    { location: "Main Store", count: 500 },
    { location: "Warehouse", count: 800 },
    { location: "Branch Store", count: 300 },
  ],
}: AnalyticsSectionProps) => {
  return (
    <div className="w-full h-[242px] bg-background p-4">
      <Card className="h-full">
        <Tabs defaultValue="distribution" className="h-full">
          <div className="flex items-center justify-between px-4 pt-2">
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
            <TabsList>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger
                value="distribution"
                className="flex items-center gap-2"
              >
                <PieChartIcon className="h-4 w-4" />
                Store Distribution
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex items-center gap-2"
              >
                <BarChartIcon className="h-4 w-4" />
                Categories
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trends" className="h-[170px] mt-2">
            <div className="h-full flex items-center justify-center text-muted-foreground">
              [Inventory Trends Chart Placeholder]
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="h-[170px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="count"
                  nameKey="location"
                  label
                >
                  {locationDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="categories" className="h-[170px] mt-2">
            <div className="h-full flex items-center justify-center text-muted-foreground">
              [Categories Chart Placeholder]
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
