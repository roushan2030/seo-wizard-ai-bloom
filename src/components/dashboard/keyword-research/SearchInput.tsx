
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

export const SearchInput = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  isLoading,
}: SearchInputProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Try 'SEO tools', 'content marketing', 'digital strategy'..."
          className="pl-10 pr-4 py-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <Button 
        onClick={handleSearch} 
        className="bg-seo-purple hover:bg-seo-purple-dark whitespace-nowrap"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Research Keywords"
        )}
      </Button>
    </div>
  );
};
