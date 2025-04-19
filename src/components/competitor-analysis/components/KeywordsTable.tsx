
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { KeywordRanking, KeywordFilters } from "../types";

interface KeywordsTableProps {
  keywords: KeywordRanking[];
  filters: KeywordFilters;
  onSort: (column: keyof KeywordRanking) => void;
}

export const KeywordsTable = ({ keywords, filters, onSort }: KeywordsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer w-[40%]" 
            onClick={() => onSort("keyword")}
          >
            <div className="flex items-center">
              Keyword
              {filters.sortColumn === "keyword" && (
                filters.sortDirection === "asc" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
          </TableHead>
          
          <TableHead 
            className="cursor-pointer text-right" 
            onClick={() => onSort("position")}
          >
            <div className="flex items-center justify-end">
              Position
              {filters.sortColumn === "position" && (
                filters.sortDirection === "asc" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
          </TableHead>
          
          <TableHead 
            className="cursor-pointer text-right" 
            onClick={() => onSort("volume")}
          >
            <div className="flex items-center justify-end">
              Volume
              {filters.sortColumn === "volume" && (
                filters.sortDirection === "asc" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
          </TableHead>
          
          <TableHead 
            className="cursor-pointer text-right" 
            onClick={() => onSort("difficulty")}
          >
            <div className="flex items-center justify-end">
              Difficulty
              {filters.sortColumn === "difficulty" && (
                filters.sortDirection === "asc" ? 
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
        {keywords.map((keyword, idx) => (
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
  );
};
