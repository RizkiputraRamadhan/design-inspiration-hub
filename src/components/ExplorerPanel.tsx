import { useState } from "react";
import { FolderOpen, Sparkles, Search, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FolderInfo {
  name: string;
  path: string;
  handle: FileSystemDirectoryHandle;
}

export const ExplorerPanel = () => {
  const [sourceFolder, setSourceFolder] = useState<FolderInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectFolder = async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        toast.error("Browser tidak mendukung fitur ini. Gunakan Chrome atau Edge terbaru.");
        return;
      }

      const handle = await (window as any).showDirectoryPicker();
      const path = handle.name;
      
      setSourceFolder({ name: handle.name, path, handle });
      toast.success(`Folder selected: ${handle.name}`);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error("Gagal memilih folder");
      }
    }
  };

  const resetSelection = () => {
    setSourceFolder(null);
    setIsProcessing(false);
  };

  const handleScanFiles = () => {
    if (sourceFolder) {
      toast.info(`Scanning files in "${sourceFolder.name}"...`);
    }
  };

  const handleOrganize = () => {
    if (sourceFolder) {
      setIsProcessing(true);
      toast.success(`Organizing files in "${sourceFolder.name}"`);
    }
  };

  const handleStop = () => {
    setIsProcessing(false);
    toast.info("Process stopped");
  };

  return (
    <div className="flex flex-col h-full w-80 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          File Organizer
        </span>
        {sourceFolder && (
          <button 
            onClick={resetSelection}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-auto">
        {/* Folder Path Card */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen size={18} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">Folder Path</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-lg border border-border">
              <span className="text-sm text-muted-foreground truncate flex-1">
                {sourceFolder ? sourceFolder.path : "No folder selected"}
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={selectFolder}
          >
            Browse Folder
          </Button>
        </div>

        {/* Actions Card */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">Actions</span>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full gap-2"
              disabled={!sourceFolder}
              onClick={handleScanFiles}
            >
              <Search size={16} />
              Scan Files
            </Button>
            
            <Button 
              className="w-full gap-2 bg-success hover:bg-success/90 text-success-foreground"
              disabled={!sourceFolder || isProcessing}
              onClick={handleOrganize}
            >
              <Sparkles size={16} />
              Start Organizing
            </Button>
            
            <Button 
              variant="destructive"
              className="w-full gap-2"
              disabled={!isProcessing}
              onClick={handleStop}
            >
              <Square size={16} />
              Stop Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
