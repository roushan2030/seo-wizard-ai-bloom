
export interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  trend: "up" | "down" | "stable";
  cpc: number;
  serp: string[];
}

export interface KeywordGroup {
  name: string;
  keywords: KeywordData[];
}

export interface CompetitorData {
  name: string;
  rank: number;
  keywords: string[];
}

export interface KeywordResearchFilters {
  minVolume?: number;
  maxVolume?: number;
  minDifficulty?: number;
  maxDifficulty?: number;
  sortBy: "relevance" | "volume" | "difficulty" | "cpc";
  sortDirection: "asc" | "desc";
}
