import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const departments = [
  { value: "all", label: "All Departments" },
  { value: "engineering", label: "Engineering" },
  { value: "procurement", label: "Procurement" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "legal", label: "Legal" },
  { value: "operations", label: "Operations" },
];

const priorities = ["urgent", "normal", "low"];
const documentTypes = ["compliance", "vendor-invoice", "maintenance", "safety-bulletin"];

export const SearchFilters = ({
  selectedDepartment,
  onDepartmentChange,
  searchQuery,
  onSearchChange,
}: SearchFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search documents, summaries, or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        {priorities.map((priority) => (
          <Badge 
            key={priority} 
            variant="outline" 
            className={`cursor-pointer hover:bg-${priority === 'urgent' ? 'danger' : priority === 'normal' ? 'primary' : 'success'}-light`}
          >
            {priority}
          </Badge>
        ))}
        {documentTypes.map((type) => (
          <Badge key={type} variant="outline" className="cursor-pointer hover:bg-accent">
            {type.replace('-', ' ')}
          </Badge>
        ))}
      </div>
    </div>
  );
};