
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  ArrowRight, 
  Plus, 
  Info,
  Copy,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

import { useKeywordResearch } from "@/hooks/useKeywordResearch";
import { KeywordGroups } from "@/components/dashboard/KeywordGroups";

const KeywordResearch = () => {
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    keywordResults,
    keywordGroups,
    handleSearch,
    filteredKeywords,
    copyToClipboard,
    exportKeywords,
  } = useKeywordResearch();

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
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Research Keywords"
            )}
          </Button>
        </div>

        {keywordResults.length > 0 && (
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="groups">Group View</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      Sort by volume (high to low)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Sort by volume (low to high)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Sort by difficulty (easy first)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Sort by CPC (high to low)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => exportKeywords("csv")}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportKeywords("txt")}>
                      Export as TXT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="list" className="mt-0">
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
                  {filteredKeywords().map((keyword, index) => (
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => copyToClipboard(keyword.keyword)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="groups" className="mt-0">
              <KeywordGroups 
                groups={keywordGroups} 
                onCopyKeyword={copyToClipboard} 
              />
            </TabsContent>
          </Tabs>
        )}
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
