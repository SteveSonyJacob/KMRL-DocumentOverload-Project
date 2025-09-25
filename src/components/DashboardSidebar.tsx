import { 
  FileText, 
  Clock, 
  Building2, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Scale, 
  Settings 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface DashboardSidebarProps {
  activeView: "documents" | "timeline";
  onViewChange: (view: "documents" | "timeline") => void;
}

const mainNavItems = [
  { icon: FileText, label: "Documents", value: "documents", count: 42 },
  { icon: Clock, label: "Timeline", value: "timeline", count: null },
];

const departmentItems = [
  { icon: Building2, label: "Engineering", value: "engineering", count: 12 },
  { icon: ShoppingCart, label: "Procurement", value: "procurement", count: 8 },
  { icon: Users, label: "HR", value: "hr", count: 5 },
  { icon: DollarSign, label: "Finance", value: "finance", count: 15 },
  { icon: Scale, label: "Legal", value: "legal", count: 3 },
  { icon: Settings, label: "Operations", value: "operations", count: 9 },
];

export const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="pt-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.value as "documents" | "timeline")}
                    isActive={activeView === item.value}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Departments */}
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {departmentItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {item.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};