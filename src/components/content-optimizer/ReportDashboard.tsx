
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentScoreType } from "@/hooks/useContentOptimizer";
import { BarChart2, FileText, Download, Share2 } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReportDashboardProps {
  contentScore: ContentScoreType;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ contentScore }) => {
  const { overall, readability, keywordDensity, semanticRelevance, sentiment, headlineStrength } = contentScore;

  const hasScores = overall > 0;

  const radarData = [
    { category: "Readability", score: readability, fullMark: 100 },
    { category: "Keyword Density", score: keywordDensity, fullMark: 100 },
    { category: "Semantic Relevance", score: semanticRelevance, fullMark: 100 },
    { category: "Sentiment", score: sentiment, fullMark: 100 },
    { category: "Headline", score: headlineStrength, fullMark: 100 },
  ];

  const scoreQualityText = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const handleExportPDF = () => {
    // Mock function - in a real implementation this would generate a PDF
    alert("PDF export functionality would be implemented here");
  };

  const handleExportCSV = () => {
    // Mock function - in a real implementation this would generate a CSV
    alert("CSV export functionality would be implemented here");
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {!hasScores ? (
        <Card className="w-full">
          <CardContent className="flex items-center justify-center py-20 text-center">
            <div>
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Analyze your content to generate detailed reports and visualizations
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-seo-purple" />
                  Content Score Visualization
                </CardTitle>
                <CardDescription>
                  Visual breakdown of your content's performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Content Score"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Score Summary</CardTitle>
                <CardDescription>
                  Detailed breakdown of your content's performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Quality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Overall</TableCell>
                      <TableCell className={`font-bold ${getScoreColor(overall)}`}>{overall}</TableCell>
                      <TableCell>{scoreQualityText(overall)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Readability</TableCell>
                      <TableCell>{readability}</TableCell>
                      <TableCell>{scoreQualityText(readability)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Keyword Density</TableCell>
                      <TableCell>{keywordDensity}</TableCell>
                      <TableCell>{scoreQualityText(keywordDensity)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Semantic Relevance</TableCell>
                      <TableCell>{semanticRelevance}</TableCell>
                      <TableCell>{scoreQualityText(semanticRelevance)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sentiment</TableCell>
                      <TableCell>{sentiment}</TableCell>
                      <TableCell>{scoreQualityText(sentiment)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Download your content analysis report in various formats
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default ReportDashboard;
