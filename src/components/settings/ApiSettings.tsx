
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

export const ApiSettings = () => {
  const handleSave = () => {
    // Placeholder for API settings update functionality
  };
  
  return (
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
  );
};
