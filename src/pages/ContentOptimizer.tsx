
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ContentAnalyzer from "@/components/content-optimizer/ContentAnalyzer";
import RecommendationPanel from "@/components/content-optimizer/RecommendationPanel";
import ReportDashboard from "@/components/content-optimizer/ReportDashboard";
import { useContentOptimizer } from "@/hooks/useContentOptimizer";

const ContentOptimizer = () => {
  const [activeTab, setActiveTab] = useState("analyzer");
  const { 
    content, 
    setContent, 
    contentScore,
    recommendations,
    isAnalyzing,
    analyzeContent
  } = useContentOptimizer();

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content Optimization</h1>
          <p className="text-gray-500">Improve your content's SEO performance</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 bg-seo-purple hover:bg-seo-purple-dark"
          onClick={() => {
            if (!content.trim()) {
              toast.warning("Please enter content to analyze");
              return;
            }
            analyzeContent();
          }}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Content"}
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="analyzer">Content Analyzer</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer">
          <ContentAnalyzer 
            content={content}
            setContent={setContent}
            contentScore={contentScore}
          />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationPanel recommendations={recommendations} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportDashboard contentScore={contentScore} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentOptimizer;
