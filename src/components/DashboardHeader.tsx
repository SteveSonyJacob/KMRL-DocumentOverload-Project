import { Bell, Search, User, Globe, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRef } from "react";

export const DashboardHeader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Immediately trigger a download of the selected file
    const blobUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = blobUrl;
    // Use original filename; browsers will save to Downloads by default
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    // Reset the input so the same file can be selected again if needed
    event.currentTarget.value = "";
  };
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">KMRL Document Portal</h1>
              <p className="text-sm text-muted-foreground">Kochi Metro Rail Limited</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Upload Button */}
          <div className="flex items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" className="gap-2" onClick={handleChooseFile}>
              <Upload className="w-4 h-4" />
              Upload
            </Button>
          </div>

          {/* Language Toggle */}
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="w-4 h-4" />
            English
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Station Controller</span>
          </Button>
        </div>
      </div>
    </header>
  );
};