import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExplorerPanel = () => {
  return (
    <div className="flex flex-col h-full w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground">
        <span>Explorer</span>
        <button className="p-1 hover:bg-sidebar-accent rounded">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="px-4 py-2">
        <div className="flex items-center gap-1 text-xs font-medium text-sidebar-foreground mb-3">
          <ChevronDown size={14} />
          <span>NO FOLDER OPENED</span>
        </div>
        
        <p className="text-sm text-sidebar-foreground mb-3">
          You have not yet opened a folder.
        </p>
        
        <Button className="w-full mb-4" size="sm">
          Open Folder
        </Button>
        
        <p className="text-sm text-sidebar-foreground mb-3">
          You can clone a repository locally.
        </p>
        
        <Button className="w-full mb-4" size="sm">
          Clone Repository
        </Button>
        
        <p className="text-sm text-sidebar-foreground">
          To learn more about how to use Git and source control in VS Code{" "}
          <a href="#" className="text-primary hover:underline">
            read our docs
          </a>
          .
        </p>
      </div>
      
      <div className="mt-auto border-t border-sidebar-border">
        <div className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-sidebar-foreground">
          <ChevronDown size={14} />
          <span>OUTLINE</span>
        </div>
        <div className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-sidebar-foreground">
          <ChevronDown size={14} />
          <span>TIMELINE</span>
        </div>
      </div>
    </div>
  );
};
