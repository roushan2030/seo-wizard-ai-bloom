import { useState, useCallback } from "react";
import { KeywordData, KeywordGroup, KeywordResearchFilters } from "@/types/keywords";
import { groupKeywords, exportToCsv, exportToTxt } from "@/services/keywordService";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_FILTERS: KeywordResearchFilters = {
  sortBy: "relevance",
  sortDirection: "desc",
};

export const useKeywordResearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywordResults, setKeywordResults] = useState<KeywordData[]>([]);
  const [keywordGroups, setKeywordGroups] = useState<KeywordGroup[]>([]);
  const [filters, setFilters] = useState<KeywordResearchFilters>(DEFAULT_FILTERS);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      console.log(`Generating AI keywords for: ${searchTerm}`);
      
      // Call the Supabase edge function to generate keywords
      const { data, error } = await supabase.functions.invoke('generate-keywords', {
        body: { keyword: searchTerm }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.keywords || !Array.isArray(data.keywords)) {
        throw new Error("Invalid response from keyword generation");
      }
      
      const results: KeywordData[] = data.keywords;
      
      // Group the keywords
      const groups = groupKeywords(results);
      
      setKeywordResults(results);
      setKeywordGroups(groups);
      
      toast({
        title: "Keywords generated",
        description: `Found ${results.length} keyword ideas for "${searchTerm}"`,
      });
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast({
        title: "Error",
        description: "Failed to generate keywords. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, toast]);

  const applyFilters = useCallback((keywords: KeywordData[]): KeywordData[] => {
    let filteredResults = [...keywords];
    
    // Apply min/max filters
    if (filters.minVolume !== undefined) {
      filteredResults = filteredResults.filter(kw => kw.volume >= filters.minVolume!);
    }
    
    if (filters.maxVolume !== undefined) {
      filteredResults = filteredResults.filter(kw => kw.volume <= filters.maxVolume!);
    }
    
    if (filters.minDifficulty !== undefined) {
      filteredResults = filteredResults.filter(kw => kw.difficulty >= filters.minDifficulty!);
    }
    
    if (filters.maxDifficulty !== undefined) {
      filteredResults = filteredResults.filter(kw => kw.difficulty <= filters.maxDifficulty!);
    }
    
    // Sort results
    filteredResults.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case "volume":
          comparison = a.volume - b.volume;
          break;
        case "difficulty":
          comparison = a.difficulty - b.difficulty;
          break;
        case "cpc":
          comparison = a.cpc - b.cpc;
          break;
        case "relevance":
        default:
          // For relevance, we just keep the original order
          return 0;
      }
      
      return filters.sortDirection === "asc" ? comparison : -comparison;
    });
    
    return filteredResults;
  }, [filters]);

  const filteredKeywords = useCallback(() => {
    return applyFilters(keywordResults);
  }, [keywordResults, applyFilters]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The text has been copied to your clipboard",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard. Please try again.",
          variant: "destructive",
        });
      }
    );
  }, [toast]);

  const exportKeywords = useCallback((format: "csv" | "txt") => {
    try {
      const filtered = filteredKeywords();
      if (filtered.length === 0) {
        toast({
          title: "Export failed",
          description: "No keywords to export",
          variant: "destructive",
        });
        return;
      }
      
      // Generate export content based on format
      const content = format === "csv" 
        ? exportToCsv(filtered)
        : exportToTxt(filtered);
      
      // Create and download file
      const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `keywords-${searchTerm.replace(/\s+/g, "-")}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export complete",
        description: `Keywords exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error("Error exporting keywords:", error);
      toast({
        title: "Export failed",
        description: "Failed to export keywords. Please try again.",
        variant: "destructive",
      });
    }
  }, [filteredKeywords, searchTerm, toast]);

  return {
    searchTerm,
    setSearchTerm,
    isLoading,
    keywordResults,
    keywordGroups,
    filters,
    setFilters,
    handleSearch,
    filteredKeywords,
    copyToClipboard,
    exportKeywords,
  };
};
