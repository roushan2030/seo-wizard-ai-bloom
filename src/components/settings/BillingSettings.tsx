
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const BillingSettings = () => {
  return (
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
  );
};
