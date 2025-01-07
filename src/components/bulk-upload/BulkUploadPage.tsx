import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload } from "lucide-react";

const importTypes = [
  {
    value: "bulk-create-update",
    label: "Bulk Create/Update Simple Products",
  },
  {
    value: "update-stock",
    label: "Update InStock Qty and/or Last Purchase Price",
  },
  {
    value: "bulk-import-orders",
    label: "Bulk Import Orders for Custom Channel",
  },
  {
    value: "bulk-return-orders",
    label: "Bulk Import Return Order Data",
  },
  {
    value: "channel-listing",
    label: "Channel Listing Mapping to Product SKU",
  },
  {
    value: "combo-products",
    label: "Bulk Create Combo Products",
  },
  {
    value: "channel-commission",
    label: "Bulk Upload Channel Commission Percent",
  },
];

const BulkUploadPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleDownloadTemplate = () => {
    // Logic to download template based on selected type
  };

  const handleFileUpload = () => {
    // Logic to handle file upload
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>DASHBOARD</span>
          <span>/</span>
          <span>IMPORT DATA</span>
          <span>/</span>
          <span className="text-foreground">Import</span>
        </div>

        <h1 className="text-2xl font-semibold text-blue-600">Import Data</h1>

        <div className="max-w-3xl">
          <p className="text-lg mb-2">
            Use this page to import data into OMS Guru
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Please ensure the accuracy of the file before uploading as you will
            be responsible for any error in this file. OMSGuru can not be held
            responsible for any errors or mistakes created by uploading wrong
            data.
          </p>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Import Data Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Import Data Type" />
                </SelectTrigger>
                <SelectContent>
                  {importTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedType && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleDownloadTemplate}
                  >
                    <Download className="h-4 w-4" />
                    Download Template
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <Input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats: .xlsx, .xls, .csv
                  </p>
                </div>

                <Button
                  className="flex items-center gap-2"
                  disabled={!file}
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BulkUploadPage;
