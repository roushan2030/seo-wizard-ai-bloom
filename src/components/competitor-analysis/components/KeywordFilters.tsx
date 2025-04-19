
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KeywordFilters } from "../types";

interface KeywordFiltersProps {
  filters: KeywordFilters;
  onFiltersChange: (filters: KeywordFilters) => void;
}

export const KeywordFilters = ({ filters, onFiltersChange }: KeywordFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Filter keywords..."
        value={filters.keyword}
        onChange={(e) => onFiltersChange({ ...filters, keyword: e.target.value })}
        className="w-[180px]"
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Position
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-2">
            <h4 className="font-medium mb-2">Filter by position</h4>
            <Select 
              value={filters.position} 
              onValueChange={(value: KeywordFilters["position"]) => 
                onFiltersChange({ ...filters, position: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All positions</SelectItem>
                <SelectItem value="1-3">Positions 1-3</SelectItem>
                <SelectItem value="4-10">Positions 4-10</SelectItem>
                <SelectItem value="11-20">Positions 11-20</SelectItem>
                <SelectItem value="21-50">Positions 21-50</SelectItem>
                <SelectItem value="51+">Positions 51+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
