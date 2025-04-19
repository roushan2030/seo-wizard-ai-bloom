
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe, ArrowDown, ArrowUp, Download, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompetitorKeywordRankings } from "@/components/competitor-analysis/CompetitorKeywordRankings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CompetitorAnalysis = () => {
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("us");
  const [isLoading, setIsLoading] = useState(false);
  const [analyzedDomain, setAnalyzedDomain] = useState("");
  const [hasResults, setHasResults] = useState(false);
  const [keywordData, setKeywordData] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain) {
      toast.error("Please enter a domain");
      return;
    }

    setIsLoading(true);
    setAnalyzedDomain(domain);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setHasResults(true);
      toast.success(`Domain ${domain} analyzed successfully`);
    }, 1500);
  };

  // Handle exporting the data to CSV
  const exportToCsv = () => {
    if (!keywordData || keywordData.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Create CSV header
    const headers = ["Keyword", "Position", "Volume", "Difficulty", "Trend", "URL"];
    
    // Convert data to CSV rows
    const rows = keywordData.map(kw => [
      kw.keyword,
      kw.position,
      kw.volume,
      kw.difficulty,
      kw.trend,
      kw.url
    ]);
    
    // Combine header and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `${analyzedDomain}-keywords-${country}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV file downloaded successfully");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Competitor Analysis</h1>
          <p className="text-gray-500">Analyze your competitors' SEO strategies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-seo-purple" />
              Domain Analysis
            </CardTitle>
            <CardDescription>
              Enter a domain to analyze its keyword rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="example.com" 
                    value={domain} 
                    onChange={(e) => setDomain(e.target.value)}
                    className="flex-1"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Domain Format</h4>
                        <p className="text-sm text-gray-500">Enter the website domain without http:// or www. For example: "example.com"</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <div className="flex gap-2">
                  <Select defaultValue={country} onValueChange={setCountry}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-seo-purple hover:bg-seo-purple/90" 
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze Domain"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {!hasResults ? (
            <CardContent className="flex items-center justify-center py-16 text-center">
              <div>
                <Search className="h-16 w-16 text-seo-purple/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Keyword Rankings</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter a domain and select a country to analyze its keyword rankings and SEO performance.
                </p>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader className="border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {analyzedDomain}
                      <span className="text-sm font-normal text-gray-500">
                        ({country.toUpperCase()})
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Top ranking keywords for this domain
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={exportToCsv}>
                    <Download className="h-4 w-4 mr-2" /> Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CompetitorKeywordRankings 
                  domain={analyzedDomain} 
                  country={country} 
                  onDataLoaded={setKeywordData}
                />
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
