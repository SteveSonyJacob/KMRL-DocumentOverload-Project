import { ExternalLink, Calendar, Tag, Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Document {
  id: string;
  title: string;
  titleMalayalam: string;
  summary: string;
  summaryMalayalam: string;
  department: string;
  type: string;
  priority: string;
  date: string;
  tags: string[];
}

interface DocumentCardProps {
  document: Document;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "bg-danger text-danger-foreground";
    case "normal": return "bg-primary text-primary-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getDepartmentColor = (department: string) => {
  const colors = {
    engineering: "bg-purple-100 text-purple-800 border-purple-200",
    procurement: "bg-orange-100 text-orange-800 border-orange-200", 
    hr: "bg-cyan-100 text-cyan-800 border-cyan-200",
    finance: "bg-emerald-100 text-emerald-800 border-emerald-200",
    legal: "bg-indigo-100 text-indigo-800 border-indigo-200",
    operations: "bg-amber-100 text-amber-800 border-amber-200",
  };
  return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <Card className="document-card hover-lift h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base leading-tight mb-1">
              {isEnglish ? document.title : document.titleMalayalam}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(document.date).toLocaleDateString()}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEnglish(!isEnglish)}
            className="shrink-0"
          >
            <Globe className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Summary */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isEnglish ? document.summary : document.summaryMalayalam}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {document.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {document.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{document.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Badge className={getDepartmentColor(document.department)}>
              {document.department}
            </Badge>
            <Badge className={getPriorityColor(document.priority)}>
              {document.priority}
            </Badge>
          </div>
          
          <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary-hover">
            <ExternalLink className="w-3 h-3" />
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};