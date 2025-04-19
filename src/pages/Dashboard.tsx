
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { KeywordsTabContent, ContentTabContent, CompetitorsTabContent } from "@/components/dashboard/DashboardTabContent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "keywords":
        navigate("/dashboard/keywords");
        break;
      case "content":
        navigate("/dashboard/content");
        break;
      case "competitors":
        navigate("/dashboard/competitors");
        break;
      default:
        // Stay on dashboard for overview
        break;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your SEO performance.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button className="bg-seo-purple hover:bg-seo-purple-dark text-white">
            <FileText className="h-4 w-4 mr-2" /> New Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="keywords">
          <KeywordsTabContent />
        </TabsContent>

        <TabsContent value="content">
          <ContentTabContent />
        </TabsContent>

        <TabsContent value="competitors">
          <CompetitorsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
