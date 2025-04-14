
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue="johndoe@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input defaultValue="Example Inc." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea 
                  defaultValue="SEO specialist focused on content optimization and keyword research."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-seo-purple hover:bg-seo-purple-dark"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" defaultValue="••••••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" defaultValue="••••••••••••" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-seo-purple hover:bg-seo-purple-dark"
                onClick={handleSave}
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Manage API keys and third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Key</label>
                <div className="flex">
                  <Input value="sk_live_•••••••••••••••••••••••••••••" readOnly className="rounded-r-none" />
                  <Button className="rounded-l-none">
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Use this API key to access our API endpoints. Keep it secure!
                </p>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">OpenAI API Integration</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <Input placeholder="Enter your OpenAI API key" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-seo-purple hover:bg-seo-purple-dark"
                onClick={handleSave}
              >
                Save Integrations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Current Plan: Pro</h3>
                    <p className="text-sm text-gray-500">$39/month, billed annually</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="rounded-md bg-gray-200 p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
