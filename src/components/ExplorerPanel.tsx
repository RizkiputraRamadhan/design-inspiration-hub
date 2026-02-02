import { FolderOpen, FolderInput, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExplorerPanel = () => {
  return (
    <div className="flex flex-col h-full w-72 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          Files
        </span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <FolderOpen size={32} className="text-primary" />
        </div>
        
        <h3 className="text-sm font-medium text-foreground mb-2">
          Select Source Folder
        </h3>
        
        <p className="text-xs text-muted-foreground text-center mb-6">
          Choose a folder to organize, then select the destination
        </p>
        
        <div className="w-full space-y-4">
          <Button className="w-full gap-2" size="sm">
            <FolderInput size={16} />
            Select Folder
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Source</span>
            <ArrowRight size={14} />
            <span>Destination</span>
          </div>
        </div>
      </div>
    </div>
  );
};
