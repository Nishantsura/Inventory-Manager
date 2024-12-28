import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package } from "lucide-react";

interface SummaryCardProps {
  totalCost?: number;
  totalStock?: number;
}

const SummaryCards = ({
  totalCost = 3381201233.65,
  totalStock = 10062122,
}: SummaryCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-4 bg-gray-50">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Cost of Goods
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹
            {totalCost.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total InStock Unit
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalStock.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
