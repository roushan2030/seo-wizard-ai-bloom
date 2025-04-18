
import { KeywordData } from "@/types/keywords";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, BarChart3, Info, Copy } from "lucide-react";

interface KeywordListViewProps {
  keywords: KeywordData[];
  onCopyKeyword: (keyword: string) => void;
}

export const KeywordListView = ({ keywords, onCopyKeyword }: KeywordListViewProps) => {
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
        {keywords.map((keyword, index) => (
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
                onClick={() => onCopyKeyword(keyword.keyword)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
