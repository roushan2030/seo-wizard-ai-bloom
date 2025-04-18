
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Download } from "lucide-react";

interface KeywordActionToolbarProps {
  onExport: (format: "csv" | "txt") => void;
}

export const KeywordActionToolbar = ({ onExport }: KeywordActionToolbarProps) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            Sort by volume (high to low)
          </DropdownMenuItem>
          <DropdownMenuItem>
            Sort by volume (low to high)
          </DropdownMenuItem>
          <DropdownMenuItem>
            Sort by difficulty (easy first)
          </DropdownMenuItem>
          <DropdownMenuItem>
            Sort by CPC (high to low)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onExport("csv")}>
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport("txt")}>
            Export as TXT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
