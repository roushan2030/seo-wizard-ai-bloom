
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useKeywordResearch } from "@/hooks/useKeywordResearch";
import { KeywordGroups } from "@/components/dashboard/KeywordGroups";
import { SearchInput } from "./keyword-research/SearchInput";
import { KeywordListView } from "./keyword-research/KeywordListView";
import { KeywordActionToolbar } from "./keyword-research/KeywordActionToolbar";

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Keyword Research</CardTitle>
        <CardDescription>
          Discover high-value keywords and analyze their potential
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SearchInput 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        {keywordResults.length > 0 && (
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="groups">Group View</TabsTrigger>
              </TabsList>
              <KeywordActionToolbar onExport={exportKeywords} />
            </div>

            <TabsContent value="list" className="mt-0">
              <KeywordListView 
                keywords={filteredKeywords()} 
                onCopyKeyword={copyToClipboard} 
              />
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
