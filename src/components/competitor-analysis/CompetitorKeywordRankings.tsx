
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordRanking } from "./types";
import { useKeywordData } from "./hooks/useKeywordData";
import { KeywordFilters } from "./components/KeywordFilters";
import { KeywordsTable } from "./components/KeywordsTable";
import { PositionDistributionChart } from "./components/PositionDistributionChart";

interface CompetitorKeywordRankingsProps {
  domain: string;
  country: string;
  onDataLoaded?: (data: KeywordRanking[]) => void;
}

export const CompetitorKeywordRankings = ({ 
  domain, 
  country, 
  onDataLoaded 
}: CompetitorKeywordRankingsProps) => {
  const { 
    isLoading, 
    filteredKeywords, 
    positionDistribution, 
    filters, 
    setFilters 
  } = useKeywordData(domain, country, onDataLoaded);

  const handleSort = (column: keyof KeywordRanking) => {
    setFilters(prev => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <div>
      <Tabs defaultValue="list">
        <div className="border-b px-6 py-3">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <KeywordFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
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
              <KeywordsTable 
                keywords={filteredKeywords}
                filters={filters}
                onSort={handleSort}
              />
            </ScrollArea>
          )}
        </TabsContent>
        
        <TabsContent value="charts" className="p-6">
          <div className="space-y-8">
            <PositionDistributionChart data={positionDistribution} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
