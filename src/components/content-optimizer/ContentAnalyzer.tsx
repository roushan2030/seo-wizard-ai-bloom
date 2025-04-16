
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ContentScoreType, ContentAnalysisType } from "@/hooks/useContentOptimizer";
import { BarChart, FileEdit, BookOpen, Gauge, AlarmClock, AlertCircle, Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ContentAnalyzerProps {
  content: string;
  setContent: (content: string) => void;
  contentScore: ContentScoreType;
  contentAnalysis: ContentAnalysisType;
}

const ContentAnalyzer: React.FC<ContentAnalyzerProps> = ({
  content,
  setContent,
  contentScore,
  contentAnalysis
}) => {
  const { overall, readability, keywordDensity, semanticRelevance, sentiment, 
          topicRelevance, contentStructure, seoScore } = contentScore;
  
  const { wordCount, sentenceCount, paragraphCount, readingTime, topKeywords,
          averageSentenceLength, averageWordLength } = contentAnalysis;

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
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
            className="min-h-[300px] mb-2 font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 mt-2">
            <div>
              {content ? `${content.length} characters • ${wordCount} words` : "0 characters"}
            </div>
            {readingTime > 0 && (
              <div className="flex items-center mt-1 sm:mt-0">
                <AlarmClock className="h-3 w-3 mr-1" />
                {readingTime} min read
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {overall > 0 && (
        <>
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
                    {getScoreLabel(overall)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart className="h-5 w-5 mr-2 text-seo-purple" />
                  Key Metrics
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
                    <span className="text-sm">Keyword Optimization</span>
                    <span className="text-sm font-medium">{keywordDensity}</span>
                  </div>
                  <Progress value={keywordDensity} className={getProgressColor(keywordDensity)} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Content Structure</span>
                    <span className="text-sm font-medium">{contentStructure}</span>
                  </div>
                  <Progress value={contentStructure} className={getProgressColor(contentStructure)} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">SEO Score</span>
                    <span className="text-sm font-medium">{seoScore}</span>
                  </div>
                  <Progress value={seoScore} className={getProgressColor(seoScore)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="h-5 w-5 mr-2 text-seo-purple" />
                  Content Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">Word Count</div>
                    <div className="text-2xl font-bold">{wordCount}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">Sentences</div>
                    <div className="text-2xl font-bold">{sentenceCount}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">Paragraphs</div>
                    <div className="text-2xl font-bold">{paragraphCount}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">Reading Time</div>
                    <div className="text-2xl font-bold">{readingTime} min</div>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg. Sentence Length</span>
                    <span className="font-medium">
                      {averageSentenceLength.toFixed(1)} words
                      {averageSentenceLength > 20 && (
                        <AlertCircle className="h-4 w-4 text-yellow-500 inline ml-1" />
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg. Word Length</span>
                    <span className="font-medium">
                      {averageWordLength.toFixed(1)} chars
                      {averageWordLength > 5.5 && (
                        <AlertCircle className="h-4 w-4 text-yellow-500 inline ml-1" />
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="h-5 w-5 mr-2 text-seo-purple" />
                  Keyword Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Density</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topKeywords.length > 0 ? (
                        topKeywords.map((keyword) => (
                          <TableRow key={keyword.word}>
                            <TableCell className="font-medium">{keyword.word}</TableCell>
                            <TableCell className="text-right">{keyword.count}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline" className={
                                keyword.density > 3 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                keyword.density > 0.5 ? "bg-green-100 text-green-800 border-green-200" :
                                "bg-blue-100 text-blue-800 border-blue-200"
                              }>
                                {keyword.density}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-500">
                            No keyword data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
                
                <div className="mt-4 text-xs text-gray-500">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <span>&gt;3%: Potential keyword stuffing</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span>0.5%-3%: Optimal density</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span>&lt;0.5%: Underutilized</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentAnalyzer;
