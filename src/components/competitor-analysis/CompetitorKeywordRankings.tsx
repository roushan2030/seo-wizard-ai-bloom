
import { useState, useMemo, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { analyzeDomain } from "@/services/competitorAnalysisService";

interface KeywordRanking {
  keyword: string;
  position: number;
  volume: number;
  trend: "up" | "down" | "stable";
  difficulty: number;
  lastUpdated: string;
  url: string;
}

interface CompetitorKeywordRankingsProps {
  domain: string;
  country: string;
}

export const CompetitorKeywordRankings = ({ domain, country }: CompetitorKeywordRankingsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState<KeywordRanking[]>([]);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState<keyof KeywordRanking>("position");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch competitor keywords data
  useEffect(() => {
    setIsLoading(true);
    
    // Get mock data from service
    const data = analyzeDomain(domain, country);
    setKeywords(data);
    setIsLoading(false);
    
  }, [domain, country]);

  const handleSort = (column: keyof KeywordRanking) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filtered and sorted keywords
  const filteredKeywords = useMemo(() => {
    return keywords
      .filter((kw) => {
        const keywordMatch = filterKeyword === "" || 
          kw.keyword.toLowerCase().includes(filterKeyword.toLowerCase());
          
        const positionMatch = positionFilter === "all" || 
          (positionFilter === "1-3" && kw.position >= 1 && kw.position <= 3) ||
          (positionFilter === "4-10" && kw.position >= 4 && kw.position <= 10) ||
          (positionFilter === "11-20" && kw.position >= 11 && kw.position <= 20) ||
          (positionFilter === "21-50" && kw.position >= 21 && kw.position <= 50) ||
          (positionFilter === "51+" && kw.position >= 51);
          
        return keywordMatch && positionMatch;
      })
      .sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        } else {
          return sortDirection === "asc" 
            ? (valueA as number) - (valueB as number) 
            : (valueB as number) - (valueA as number);
        }
      });
  }, [keywords, filterKeyword, positionFilter, sortColumn, sortDirection]);

  // Position distribution for chart
  const positionDistribution = useMemo(() => {
    const ranges = [
      { name: "1-3", count: 0 },
      { name: "4-10", count: 0 },
      { name: "11-20", count: 0 },
      { name: "21-50", count: 0 },
      { name: "51+", count: 0 },
    ];
    
    keywords.forEach(kw => {
      if (kw.position >= 1 && kw.position <= 3) ranges[0].count++;
      else if (kw.position <= 10) ranges[1].count++;
      else if (kw.position <= 20) ranges[2].count++;
      else if (kw.position <= 50) ranges[3].count++;
      else ranges[4].count++;
    });
    
    return ranges;
  }, [keywords]);

  return (
    <div>
      <Tabs defaultValue="list">
        <div className="border-b px-6 py-3">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter keywords..."
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                className="w-[180px]"
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Position
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <h4 className="font-medium mb-2">Filter by position</h4>
                    <Select value={positionFilter} onValueChange={setPositionFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All positions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All positions</SelectItem>
                        <SelectItem value="1-3">Positions 1-3</SelectItem>
                        <SelectItem value="4-10">Positions 4-10</SelectItem>
                        <SelectItem value="11-20">Positions 11-20</SelectItem>
                        <SelectItem value="21-50">Positions 21-50</SelectItem>
                        <SelectItem value="51+">Positions 51+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <TabsContent value="list" className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-6">
              <p>Loading keyword data...</p>
            </div>
          ) : filteredKeywords.length === 0 ? (
            <div className="flex justify-center items-center p-6">
              <p>No keywords found matching your filters</p>
            </div>
          ) : (
            <ScrollArea className="h-[550px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer w-[40%]" 
                      onClick={() => handleSort("keyword")}
                    >
                      <div className="flex items-center">
                        Keyword
                        {sortColumn === "keyword" && (
                          sortDirection === "asc" ? 
                            <ArrowUp className="ml-1 h-4 w-4" /> : 
                            <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="cursor-pointer text-right" 
                      onClick={() => handleSort("position")}
                    >
                      <div className="flex items-center justify-end">
                        Position
                        {sortColumn === "position" && (
                          sortDirection === "asc" ? 
                            <ArrowUp className="ml-1 h-4 w-4" /> : 
                            <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="cursor-pointer text-right" 
                      onClick={() => handleSort("volume")}
                    >
                      <div className="flex items-center justify-end">
                        Volume
                        {sortColumn === "volume" && (
                          sortDirection === "asc" ? 
                            <ArrowUp className="ml-1 h-4 w-4" /> : 
                            <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="cursor-pointer text-right" 
                      onClick={() => handleSort("difficulty")}
                    >
                      <div className="flex items-center justify-end">
                        Difficulty
                        {sortColumn === "difficulty" && (
                          sortDirection === "asc" ? 
                            <ArrowUp className="ml-1 h-4 w-4" /> : 
                            <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    
                    <TableHead className="cursor-pointer text-right">
                      Trend
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeywords.map((keyword, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex flex-col">
                          <span className="font-medium">{keyword.keyword}</span>
                          <span className="text-xs text-gray-500 truncate">{keyword.url}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <Badge 
                          variant={keyword.position <= 3 ? "default" : 
                                (keyword.position <= 10 ? "outline" : "secondary")}
                          className={keyword.position <= 3 ? "bg-green-600" : ""}
                        >
                          {keyword.position}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        {keyword.volume.toLocaleString()}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <span className={
                          keyword.difficulty < 30 ? "text-green-600" : 
                          keyword.difficulty < 70 ? "text-amber-600" : 
                          "text-red-600"
                        }>
                          {keyword.difficulty}
                        </span>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        {keyword.trend === "up" ? (
                          <ArrowUp className="inline ml-2 h-4 w-4 text-green-600" />
                        ) : keyword.trend === "down" ? (
                          <ArrowDown className="inline ml-2 h-4 w-4 text-red-600" />
                        ) : (
                          <span className="inline-block w-4 h-0.5 bg-gray-300 ml-2" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </TabsContent>
        
        <TabsContent value="charts" className="p-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Position Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={positionDistribution}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Keywords" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Distribution of keywords across different ranking positions
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
