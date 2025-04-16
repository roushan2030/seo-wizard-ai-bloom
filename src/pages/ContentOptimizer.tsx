
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ContentAnalyzer from "@/components/content-optimizer/ContentAnalyzer";
import RecommendationPanel from "@/components/content-optimizer/RecommendationPanel";
import ReportDashboard from "@/components/content-optimizer/ReportDashboard";
import HeadlineAnalyzer from "@/components/content-optimizer/HeadlineAnalyzer";
import MetaTagGenerator from "@/components/content-optimizer/MetaTagGenerator";
import CompetitorBenchmark from "@/components/content-optimizer/CompetitorBenchmark";
import { useContentOptimizer } from "@/hooks/useContentOptimizer";

const ContentOptimizer = () => {
  const [activeTab, setActiveTab] = useState("analyzer");
  const { 
    content, 
    setContent, 
    targetKeywords,
    setTargetKeywords,
    targetTopic,
    setTargetTopic,
    contentScore,
    contentAnalysis,
    recommendations,
    metaTags,
    isAnalyzing,
    analyzeContent,
    historicalData,
    competitorData
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="targetKeywords">Target Keywords (comma separated)</Label>
          <Input
            id="targetKeywords"
            placeholder="e.g. seo, content marketing, optimization"
            value={targetKeywords}
            onChange={(e) => setTargetKeywords(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="targetTopic">Target Topic / Niche</Label>
          <Input
            id="targetTopic"
            placeholder="e.g. Digital Marketing"
            value={targetTopic}
            onChange={(e) => setTargetTopic(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            className="w-full"
            disabled={isAnalyzing}
            onClick={() => {
              setTargetKeywords("");
              setTargetTopic("");
              toast.success("Settings cleared");
            }}
          >
            Clear Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="analyzer">Content Analyzer</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="headline">Headline Analyzer</TabsTrigger>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer">
          <ContentAnalyzer 
            content={content}
            setContent={setContent}
            contentScore={contentScore}
            contentAnalysis={contentAnalysis}
          />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationPanel recommendations={recommendations} />
        </TabsContent>

        <TabsContent value="headline">
          <HeadlineAnalyzer 
            content={content} 
            headlineScore={contentScore.headlineStrength}
          />
        </TabsContent>

        <TabsContent value="meta">
          <MetaTagGenerator metaTags={metaTags} />
        </TabsContent>

        <TabsContent value="competitors">
          <CompetitorBenchmark 
            score={contentScore.overall}
            competitors={competitorData}
          />
        </TabsContent>

        <TabsContent value="reports">
          <ReportDashboard 
            contentScore={contentScore} 
            historicalData={historicalData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentOptimizer;
