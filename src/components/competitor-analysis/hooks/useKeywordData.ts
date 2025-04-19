
import { useState, useMemo, useEffect } from "react";
import { analyzeDomain } from "@/services/competitorAnalysisService";
import { KeywordRanking, KeywordFilters } from "../types";

export const useKeywordData = (
  domain: string, 
  country: string,
  onDataLoaded?: (data: KeywordRanking[]) => void
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState<KeywordRanking[]>([]);
  const [filters, setFilters] = useState<KeywordFilters>({
    keyword: "",
    position: "all",
    sortColumn: "position",
    sortDirection: "asc"
  });

  useEffect(() => {
    setIsLoading(true);
    const data = analyzeDomain(domain, country);
    setKeywords(data);
    setIsLoading(false);
    
    if (onDataLoaded) {
      onDataLoaded(data);
    }
  }, [domain, country, onDataLoaded]);

  const filteredKeywords = useMemo(() => {
    return keywords
      .filter((kw) => {
        const keywordMatch = filters.keyword === "" || 
          kw.keyword.toLowerCase().includes(filters.keyword.toLowerCase());
          
        const positionMatch = filters.position === "all" || 
          (filters.position === "1-3" && kw.position >= 1 && kw.position <= 3) ||
          (filters.position === "4-10" && kw.position >= 4 && kw.position <= 10) ||
          (filters.position === "11-20" && kw.position >= 11 && kw.position <= 20) ||
          (filters.position === "21-50" && kw.position >= 21 && kw.position <= 50) ||
          (filters.position === "51+" && kw.position >= 51);
          
        return keywordMatch && positionMatch;
      })
      .sort((a, b) => {
        const valueA = a[filters.sortColumn];
        const valueB = b[filters.sortColumn];
        
        if (typeof valueA === "string" && typeof valueB === "string") {
          return filters.sortDirection === "asc" 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        } else {
          return filters.sortDirection === "asc" 
            ? (valueA as number) - (valueB as number) 
            : (valueB as number) - (valueA as number);
        }
      });
  }, [keywords, filters]);

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

  return {
    isLoading,
    filteredKeywords,
    positionDistribution,
    filters,
    setFilters
  };
};
