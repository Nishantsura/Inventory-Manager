import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSalesData } from "@/lib/mock-data";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Revenue
            </div>
            <div className="text-2xl font-bold mb-1">
              ₹{mockSalesData.today.total.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">
              +{mockSalesData.today.percentChange}% from last month
            </div>
          </Card>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Orders Today
            </div>
            <div className="text-2xl font-bold mb-1">
              {mockSalesData.today.orders}
            </div>
            <div className="text-sm text-muted-foreground">
              Avg. ₹{mockSalesData.today.averageOrder} per order
            </div>
          </Card>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Active Users
            </div>
            <div className="text-2xl font-bold mb-1">2,345</div>
            <div className="text-sm text-green-600">+15% from last week</div>
          </Card>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Conversion Rate
            </div>
            <div className="text-2xl font-bold mb-1">3.2%</div>
            <div className="text-sm text-red-600">-0.5% from last week</div>
          </Card>
        </div>

        {/* Category Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Category Distribution
            </h3>
            <div className="h-[300px]">
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
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Monthly Sales Trends</h3>
            <div className="h-[300px]">
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
            </div>
          </Card>
        </div>

        {/* Sales Trends */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Daily Sales</h3>
          <div className="h-[300px]">
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
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
