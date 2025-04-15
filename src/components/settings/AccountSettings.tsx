
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AccountSettings = () => {
  const handleSave = () => {
    // Placeholder for account settings update functionality
  };
  
  return (
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
  );
};
