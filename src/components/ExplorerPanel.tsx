import { Folder, GitBranch, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExplorerPanel = () => {
  return (
    <div className="flex flex-col h-full w-72 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          Explorer
        </span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Folder size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="text-sm font-medium text-foreground mb-2">
          No Folder Opened
        </h3>
        
        <p className="text-xs text-muted-foreground text-center mb-6">
          Open a folder to start working on your project
        </p>
        
        <div className="w-full space-y-3">
          <Button className="w-full gap-2" size="sm">
            <Folder size={16} />
            Open Folder
          </Button>
          
          <Button variant="outline" className="w-full gap-2" size="sm">
            <GitBranch size={16} />
            Clone Repository
          </Button>
        </div>
        
        <a 
          href="#" 
          className="flex items-center gap-2 mt-6 text-xs text-primary hover:underline"
        >
          <BookOpen size={14} />
          Learn about source control
        </a>
      </div>
    </div>
  );
};
