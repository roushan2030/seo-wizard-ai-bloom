
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentScoreType } from "@/hooks/useContentOptimizer";
import { BarChart2, FileText, Download, Share2, PieChart, LineChart, Calendar } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportDashboardProps {
  contentScore: ContentScoreType;
  historicalData: {date: string, score: number}[];
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ contentScore, historicalData }) => {
  const { overall, readability, keywordDensity, semanticRelevance, sentiment, headlineStrength, topicRelevance, contentStructure, seoScore } = contentScore;

  const hasScores = overall > 0;

  const radarData = [
    { category: "Readability", score: readability, fullMark: 100 },
    { category: "Keywords", score: keywordDensity, fullMark: 100 },
    { category: "Semantics", score: semanticRelevance, fullMark: 100 },
    { category: "Sentiment", score: sentiment, fullMark: 100 },
    { category: "Headline", score: headlineStrength, fullMark: 100 },
    { category: "Structure", score: contentStructure, fullMark: 100 },
    { category: "Topic", score: topicRelevance, fullMark: 100 },
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
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                <BarChart2 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trends">
                <LineChart className="h-4 w-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="details">
                <PieChart className="h-4 w-4 mr-2" />
                Detailed Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
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
                          <TableCell className="font-medium">SEO Score</TableCell>
                          <TableCell>{seoScore}</TableCell>
                          <TableCell>{scoreQualityText(seoScore)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-seo-purple" />
                    Historical Performance
                  </CardTitle>
                  <CardDescription>
                    Track how your content score has changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {historicalData.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={historicalData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          name="Content Score"
                          stroke="#8884d8" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Not Enough Historical Data</h3>
                      <p className="text-gray-500 max-w-md">
                        Analyze your content multiple times to track improvements over time
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Metrics Report</CardTitle>
                  <CardDescription>
                    Complete analysis of all content metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Impact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Overall</TableCell>
                        <TableCell className={`font-bold ${getScoreColor(overall)}`}>{overall}</TableCell>
                        <TableCell>{scoreQualityText(overall)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Readability</TableCell>
                        <TableCell>{readability}</TableCell>
                        <TableCell>{scoreQualityText(readability)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Keyword Density</TableCell>
                        <TableCell>{keywordDensity}</TableCell>
                        <TableCell>{scoreQualityText(keywordDensity)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Semantic Relevance</TableCell>
                        <TableCell>{semanticRelevance}</TableCell>
                        <TableCell>{scoreQualityText(semanticRelevance)}</TableCell>
                        <TableCell>Medium</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Sentiment</TableCell>
                        <TableCell>{sentiment}</TableCell>
                        <TableCell>{scoreQualityText(sentiment)}</TableCell>
                        <TableCell>Medium</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Headline Strength</TableCell>
                        <TableCell>{headlineStrength}</TableCell>
                        <TableCell>{scoreQualityText(headlineStrength)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Topic Relevance</TableCell>
                        <TableCell>{topicRelevance}</TableCell>
                        <TableCell>{scoreQualityText(topicRelevance)}</TableCell>
                        <TableCell>Medium</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Content Structure</TableCell>
                        <TableCell>{contentStructure}</TableCell>
                        <TableCell>{scoreQualityText(contentStructure)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SEO Score</TableCell>
                        <TableCell>{seoScore}</TableCell>
                        <TableCell>{scoreQualityText(seoScore)}</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
