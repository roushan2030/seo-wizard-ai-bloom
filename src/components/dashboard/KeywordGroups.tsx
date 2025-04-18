
import { useState } from "react";
import { KeywordGroup } from "@/types/keywords";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";

interface KeywordGroupsProps {
  groups: KeywordGroup[];
  onCopyKeyword: (keyword: string) => void;
}

export const KeywordGroups = ({ groups, onCopyKeyword }: KeywordGroupsProps) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No keyword groups to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Keyword Groups</h2>
      {groups.map((group) => (
        <Collapsible
          key={group.name}
          open={openGroups[group.name]}
          onOpenChange={() => toggleGroup(group.name)}
          className="border rounded-md overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                {openGroups[group.name] ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
                <span className="font-medium capitalize">{group.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {group.keywords.length} keywords
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>CPC</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.keywords.map((keyword) => (
                    <TableRow key={keyword.keyword}>
                      <TableCell className="font-medium">
                        {keyword.keyword}
                      </TableCell>
                      <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>{keyword.difficulty}</TableCell>
                      <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onCopyKeyword(keyword.keyword)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
