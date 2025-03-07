
import { useState } from "react";
import { AlertSeverity } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, AlertTriangle, AlertCircle, Info, Filter, X } from "lucide-react";

interface FilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  severity: AlertSeverity[];
  showReviewed: boolean;
  showUnreviewed: boolean;
}

const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    severity: ["high", "medium", "low"],
    showReviewed: true,
    showUnreviewed: true,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSeverityChange = (value: string[]) => {
    // Don't allow empty selection
    if (value.length === 0) return;
    
    // Cast the string[] to AlertSeverity[] since we've validated that these values are valid
    const severityValues = value.filter((v): v is AlertSeverity => 
      v === 'high' || v === 'medium' || v === 'low'
    );
    
    const newFilters = { 
      ...filters, 
      severity: severityValues 
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReviewedToggle = (showReviewed: boolean) => {
    // Don't allow both to be false
    if (!showReviewed && !filters.showUnreviewed) return;
    
    const newFilters = { ...filters, showReviewed };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleUnreviewedToggle = (showUnreviewed: boolean) => {
    // Don't allow both to be false
    if (!showUnreviewed && !filters.showReviewed) return;
    
    const newFilters = { ...filters, showUnreviewed };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      severity: ["high", "medium", "low"],
      showReviewed: true,
      showUnreviewed: true,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.search !== "" || 
    filters.severity.length !== 3 || 
    !filters.showReviewed || 
    !filters.showUnreviewed;

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search alerts by child name or content..."
          className="pl-9"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Severity:
          </label>
          <ToggleGroup type="multiple" value={filters.severity} onValueChange={handleSeverityChange} className="justify-start">
            <ToggleGroupItem value="high" className="px-2 py-1 h-auto data-[state=on]:bg-red-100 data-[state=on]:text-red-800 dark:data-[state=on]:bg-red-900/30 dark:data-[state=on]:text-red-300">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              High
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" className="px-2 py-1 h-auto data-[state=on]:bg-amber-100 data-[state=on]:text-amber-800 dark:data-[state=on]:bg-amber-900/30 dark:data-[state=on]:text-amber-300">
              <AlertCircle className="h-3.5 w-3.5 mr-1" />
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem value="low" className="px-2 py-1 h-auto data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800 dark:data-[state=on]:bg-blue-900/30 dark:data-[state=on]:text-blue-300">
              <Info className="h-3.5 w-3.5 mr-1" />
              Low
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Status:</label>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filters.showReviewed ? "default" : "outline"}
              className="px-2 py-1 h-auto text-xs"
              onClick={() => handleReviewedToggle(!filters.showReviewed)}
            >
              Reviewed
            </Button>
            <Button
              size="sm"
              variant={filters.showUnreviewed ? "default" : "outline"}
              className="px-2 py-1 h-auto text-xs"
              onClick={() => handleUnreviewedToggle(!filters.showUnreviewed)}
            >
              Pending
            </Button>
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs self-end"
          >
            <X className="h-3.5 w-3.5 mr-1" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterControls;
