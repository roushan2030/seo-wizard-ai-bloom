import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, Search, Plus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompetitorBenchmarkProps {
  score: number;
  competitors: {name: string, score: number}[];
}

const CompetitorBenchmark: React.FC<CompetitorBenchmarkProps> = ({ score, competitors }) => {
  const [url, setUrl] = React.useState("");
  const [localCompetitors, setLocalCompetitors] = React.useState<{name: string, score: number}[]>([]);
  
  React.useEffect(() => {
    if (competitors.length > 0) {
      setLocalCompetitors(competitors);
    }
  }, [competitors]);
  
  const handleAddCompetitor = () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    // Extract domain name for display
    let domain = url;
    try {
      domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      domain = domain.replace("www.", "");
    } catch (e) {
      // Keep original if invalid URL
    }
    
    // Generate a random score between 40-90 for demo purposes
    const randomScore = Math.floor(Math.random() * 50) + 40;
    
    setLocalCompetitors([
      ...localCompetitors,
      { name: domain, score: randomScore }
    ]);
    
    setUrl("");
    toast.success(`Added ${domain} to competitors`);
  };
  
  const chartData = [
    { name: "Your Content", score },
    ...localCompetitors.map(c => ({ name: c.name, score: c.score }))
  ];
  
  const getSuggestions = () => {
    const yourScore = score;
    if (localCompetitors.length === 0) return [];
    
    const averageCompScore = localCompetitors.reduce((sum, comp) => sum + comp.score, 0) / localCompetitors.length;
    
    const suggestions = [];
    
    if (yourScore < averageCompScore - 10) {
      suggestions.push({
        title: "Content Length",
        description: "Your competitors likely have longer, more comprehensive content. Consider expanding your content with more details and examples."
      });
      suggestions.push({
        title: "Keyword Coverage",
        description: "You may need to improve your keyword coverage to match or exceed your competitors."
      });
    }
    
    if (yourScore > averageCompScore + 10) {
      suggestions.push({
        title: "Content Promotion",
        description: "Your content appears stronger than competitors. Consider investing in promotion to maximize your advantage."
      });
    }
    
    // Add general suggestions
    suggestions.push({
      title: "Competitive Topics",
      description: "Analyze your competitors' content to identify topic gaps you can fill with new content."
    });
    
    return suggestions;
  };
  
  const competitiveSuggestions = getSuggestions();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-seo-purple" />
            Competitive Analysis
          </CardTitle>
          <CardDescription>
            Compare your content against competitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter competitor URL (e.g., competitor.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddCompetitor}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          {score === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Analyze your content first to compare with competitors</p>
            </div>
          ) : localCompetitors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Add competitor URLs to see how your content compares</p>
            </div>
          ) : (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="score" 
                    name="Content Score" 
                    fill="#8884d8"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-seo-purple" />
            Competitive Insights
          </CardTitle>
          <CardDescription>
            Detailed comparison and improvement suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {score === 0 || localCompetitors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Add competitors to see insights and recommendations</p>
            </div>
          ) : (
            <div className="space-y-6">
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Difference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-medium">
                      <TableCell>Your Content</TableCell>
                      <TableCell className="text-right">{score}</TableCell>
                      <TableCell className="text-right">-</TableCell>
                    </TableRow>
                    {localCompetitors.map((competitor, idx) => {
                      const diff = score - competitor.score;
                      return (
                        <TableRow key={idx}>
                          <TableCell>{competitor.name}</TableCell>
                          <TableCell className="text-right">{competitor.score}</TableCell>
                          <TableCell className={`text-right ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {diff > 0 ? `+${diff}` : diff}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
              
              <div>
                <h3 className="font-medium mb-3">Competitive Recommendations</h3>
                <div className="space-y-3">
                  {competitiveSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-3 border rounded-md">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorBenchmark;
