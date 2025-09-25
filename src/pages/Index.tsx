import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DocumentGrid } from "@/components/DocumentGrid";
import { TimelineView } from "@/components/TimelineView";
import { SearchFilters } from "@/components/SearchFilters";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState<"documents" | "timeline">("documents");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar 
            activeView={activeView}
            onViewChange={setActiveView}
          />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 p-6 space-y-6">
              <SearchFilters
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {activeView === "documents" && (
                <DocumentGrid 
                  department={selectedDepartment}
                  searchQuery={searchQuery}
                />
              )}

              {activeView === "timeline" && (
                <TimelineView 
                  department={selectedDepartment}
                />
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;