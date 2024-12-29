import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { mockSalesData } from "@/lib/mock-data";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalyticsSection = () => {
  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Today's Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Today's Sales
          </div>
          <div className="text-2xl font-bold">
            ${mockSalesData.today.total.toLocaleString()}
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">
              {mockSalesData.today.percentChange}%
            </span>
            <span className="text-muted-foreground ml-1">vs yesterday</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Orders
          </div>
          <div className="text-2xl font-bold">{mockSalesData.today.orders}</div>
          <div className="text-sm text-muted-foreground mt-2">
            Today's total orders
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Average Order
          </div>
          <div className="text-2xl font-bold">
            ${mockSalesData.today.averageOrder}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Per transaction
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Hourly Trend
          </div>
          <div className="h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData.hourlyTrends}>
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <Tabs defaultValue="monthly" className="h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sales Trends</h3>
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="hourly">Today</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="hourly" className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData.hourlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Category Distribution</h3>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockSalesData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {mockSalesData.categoryDistribution.map((entry, index) => (
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
          </div>
          <div className="mt-4 space-y-2">
            {mockSalesData.categoryDistribution.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm font-medium">
                  ${category.sales.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsSection;
