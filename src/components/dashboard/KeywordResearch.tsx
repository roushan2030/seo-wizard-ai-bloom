
import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  ArrowRight, 
  Plus, 
  Info 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const KeywordResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keywordResults, setKeywordResults] = useState([
    {
      keyword: "ai seo tools",
      volume: 6500,
      difficulty: 68,
      trend: "up",
      cpc: 4.75,
      serp: ["SEMrush", "Ahrefs", "Moz", "SEO.ai"]
    },
    {
      keyword: "best seo ai software",
      volume: 3200,
      difficulty: 52,
      trend: "up",
      cpc: 5.85,
      serp: ["TechRadar", "G2", "Capterra", "SEO.ai"]
    },
    {
      keyword: "content optimization with ai",
      volume: 2100,
      difficulty: 45,
      trend: "up",
      cpc: 3.95,
      serp: ["HubSpot", "ContentIQ", "SEO.ai", "WordAI"]
    },
    {
      keyword: "ai keyword research",
      volume: 8400,
      difficulty: 71,
      trend: "up",
      cpc: 6.25,
      serp: ["Ahrefs", "SEMrush", "SEO.ai", "KeywordTool"]
    },
    {
      keyword: "seo analytics platform",
      volume: 1800,
      difficulty: 63,
      trend: "stable",
      cpc: 4.50,
      serp: ["Google Analytics", "SEMrush", "Moz", "SEO.ai"]
    }
  ]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      // In a real app, this would be replaced with an actual API call
      console.log(`Searching for: ${searchTerm}`);
      
      // Example of how you might use OpenAI API to generate keywords
      // const response = await fetch('/api/generate-keywords', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ searchTerm })
      // });
      // const data = await response.json();
      // setKeywordResults(data.keywords);
      
      setIsLoading(false);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-600";
    if (difficulty < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return "Easy";
    if (difficulty < 60) return "Medium";
    return "Hard";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Keyword Research</CardTitle>
        <CardDescription>
          Discover high-value keywords and analyze their potential
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter a keyword or topic..."
              className="pl-10 pr-4 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            className="bg-seo-purple hover:bg-seo-purple-dark whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Research Keywords"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Keyword</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Volume
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Monthly search volume</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Difficulty
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>SEO difficulty score (0-100)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>CPC ($)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordResults.map((keyword, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{keyword.keyword}</TableCell>
                <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={getDifficultyColor(keyword.difficulty)}>
                      {keyword.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({getDifficultyLabel(keyword.difficulty)})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {keyword.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : keyword.trend === "down" ? (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  ) : (
                    <BarChart3 className="h-5 w-5 text-yellow-600" />
                  )}
                </TableCell>
                <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">
          Showing {keywordResults.length} keywords
        </p>
        <Button variant="outline" className="text-seo-purple">
          View More Keywords <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KeywordResearch;
