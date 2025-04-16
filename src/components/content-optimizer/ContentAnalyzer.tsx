
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ContentScoreType } from "@/hooks/useContentOptimizer";
import { BarChart, FileEdit, BookOpen, Gauge } from "lucide-react";

interface ContentAnalyzerProps {
  content: string;
  setContent: (content: string) => void;
  contentScore: ContentScoreType;
}

const ContentAnalyzer: React.FC<ContentAnalyzerProps> = ({
  content,
  setContent,
  contentScore
}) => {
  const { overall, readability, keywordDensity, semanticRelevance, sentiment } = contentScore;

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileEdit className="h-5 w-5 mr-2 text-seo-purple" />
            Content Editor
          </CardTitle>
          <CardDescription>
            Enter your content to analyze and optimize for better SEO performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your content here..."
            className="min-h-[300px] mb-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="text-xs text-gray-500">
            {content ? `${content.length} characters` : "0 characters"}
          </div>
        </CardContent>
      </Card>

      {overall > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Gauge className="h-5 w-5 mr-2 text-seo-purple" />
                Overall Content Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center flex-col">
                <div className="h-32 w-32 rounded-full border-8 border-gray-100 flex items-center justify-center mb-4 relative">
                  <div 
                    className="absolute inset-0 rounded-full" 
                    style={{
                      background: `conic-gradient(${getProgressColor(overall)} ${overall}%, transparent ${overall}%)`,
                      clipPath: 'circle(50% at 50% 50%)'
                    }}
                  />
                  <span className="text-4xl font-bold z-10">{overall}</span>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {overall >= 80 ? "Excellent" : overall >= 60 ? "Good" : "Needs Improvement"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart className="h-5 w-5 mr-2 text-seo-purple" />
                Detailed Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Readability</span>
                  <span className="text-sm font-medium">{readability}</span>
                </div>
                <Progress value={readability} className={getProgressColor(readability)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Keyword Density</span>
                  <span className="text-sm font-medium">{keywordDensity}</span>
                </div>
                <Progress value={keywordDensity} className={getProgressColor(keywordDensity)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Semantic Relevance</span>
                  <span className="text-sm font-medium">{semanticRelevance}</span>
                </div>
                <Progress value={semanticRelevance} className={getProgressColor(semanticRelevance)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Sentiment</span>
                  <span className="text-sm font-medium">{sentiment}</span>
                </div>
                <Progress value={sentiment} className={getProgressColor(sentiment)} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentAnalyzer;
