
export interface KeywordRanking {
  keyword: string;
  position: number;
  volume: number;
  trend: "up" | "down" | "stable";
  difficulty: number;
  lastUpdated: string;
  url: string;
}

export interface KeywordFilters {
  keyword: string;
  position: "all" | "1-3" | "4-10" | "11-20" | "21-50" | "51+";
  sortColumn: keyof KeywordRanking;
  sortDirection: "asc" | "desc";
}

export interface PositionRange {
  name: string;
  count: number;
}
