import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button>Save Changes</Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="My Bookstore" />
                </div>

                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input type="email" defaultValue="contact@mybookstore.com" />
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input defaultValue="USD" />
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Input defaultValue="UTC-5 (Eastern Time)" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                {/* Add notification settings here */}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                {/* Add security settings here */}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
