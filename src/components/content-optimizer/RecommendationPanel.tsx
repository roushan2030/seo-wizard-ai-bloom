
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendationType } from "@/hooks/useContentOptimizer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, FileText, AlertTriangle } from "lucide-react";

interface RecommendationPanelProps {
  recommendations: RecommendationType[];
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ recommendations }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5 mr-2 text-red-600" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 mr-2 text-gray-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { label: string, color: string }> = {
      readability: { label: "Readability", color: "bg-purple-100 text-purple-800 border-purple-200" },
      keywords: { label: "Keywords", color: "bg-green-100 text-green-800 border-green-200" },
      structure: { label: "Structure", color: "bg-blue-100 text-blue-800 border-blue-200" },
      seo: { label: "SEO", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
      headline: { label: "Headline", color: "bg-orange-100 text-orange-800 border-orange-200" }
    };
    
    const { label, color } = categories[category] || { label: category, color: "bg-gray-100 text-gray-800 border-gray-200" };
    
    return (
      <Badge variant="outline" className={`${color} font-normal`}>
        {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Recommendations</CardTitle>
        <CardDescription>
          Apply these suggestions to improve your content's SEO performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Analyze your content to receive recommendations</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      {getSeverityIcon(rec.severity)}
                      <h3 className="font-medium">{rec.title}</h3>
                    </div>
                    {getCategoryBadge(rec.category)}
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">{rec.description}</p>
                  <div className={`p-3 rounded-md text-sm ${getSeverityColor(rec.severity)}`}>
                    <strong>Suggestion:</strong> {rec.improvement}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationPanel;
