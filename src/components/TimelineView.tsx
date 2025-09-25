import { Clock, AlertTriangle, CheckCircle, Info, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  department: string;
  type: "update" | "alert" | "completion" | "info";
  timestamp: string;
  priority: "low" | "normal" | "urgent";
}

const mockTimelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "Emergency Response Protocol Updated",
    description: "New fire safety procedures implemented across all stations",
    department: "operations",
    type: "alert",
    timestamp: "2024-01-15T14:30:00Z",
    priority: "urgent",
  },
  {
    id: "2", 
    title: "Monthly Safety Inspection Completed",
    description: "All stations passed safety inspection with no major violations",
    department: "engineering",
    type: "completion",
    timestamp: "2024-01-15T10:15:00Z",
    priority: "normal",
  },
  {
    id: "3",
    title: "Q1 Budget Allocation Approved",
    description: "Department budgets for first quarter have been finalized",
    department: "finance",
    type: "update",
    timestamp: "2024-01-14T16:45:00Z",
    priority: "normal",
  },
  {
    id: "4",
    title: "New Vendor Registration",
    description: "Electrical maintenance contractor ABC Ltd. has been approved",
    department: "procurement",
    type: "info",
    timestamp: "2024-01-14T11:20:00Z",
    priority: "low",
  },
  {
    id: "5",
    title: "Staff Training Schedule Released",
    description: "Q1 2024 training calendar now available for all departments",
    department: "hr",
    type: "update",
    timestamp: "2024-01-13T09:00:00Z",
    priority: "normal",
  },
];

interface TimelineViewProps {
  department: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "alert": return AlertTriangle;
    case "completion": return CheckCircle;
    case "update": return Clock;
    case "info": return Info;
    default: return Clock;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "alert": return "text-danger";
    case "completion": return "text-success";
    case "update": return "text-primary";
    case "info": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "bg-danger text-danger-foreground";
    case "normal": return "bg-primary text-primary-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const TimelineView = ({ department }: TimelineViewProps) => {
  // Filter timeline items based on department
  const filteredItems = mockTimelineItems.filter((item) => 
    department === "all" || item.department === department
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Activity Timeline</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Last 7 days
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
        
        <div className="space-y-4">
          {filteredItems.map((item, index) => {
            const Icon = getTypeIcon(item.type);
            const timestamp = formatTimestamp(item.timestamp);
            
            return (
              <div key={item.id} className="relative flex items-start gap-4">
                {/* Timeline Dot */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-border`}>
                  <Icon className={`w-4 h-4 ${getTypeColor(item.type)}`} />
                </div>

                {/* Content Card */}
                <Card className="flex-1 ml-2">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{item.title}</h3>
                          <Badge className={getPriorityColor(item.priority)} variant="secondary">
                            {item.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {item.department}
                          </Badge>
                          <span>{timestamp.date}</span>
                          <span>{timestamp.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No timeline items for the selected filters.</p>
        </div>
      )}
    </div>
  );
};