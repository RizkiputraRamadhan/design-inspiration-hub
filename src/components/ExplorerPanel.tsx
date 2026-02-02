import { useState } from "react";
import { FolderOpen, FolderInput, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FolderInfo {
  name: string;
  handle: FileSystemDirectoryHandle;
}

export const ExplorerPanel = () => {
  const [sourceFolder, setSourceFolder] = useState<FolderInfo | null>(null);
  const [destinationFolder, setDestinationFolder] = useState<FolderInfo | null>(null);

  const selectFolder = async (type: 'source' | 'destination') => {
    try {
      // Check if the API is supported
      if (!('showDirectoryPicker' in window)) {
        toast.error("Browser tidak mendukung fitur ini. Gunakan Chrome atau Edge terbaru.");
        return;
      }

      const handle = await (window as any).showDirectoryPicker();
      
      if (type === 'source') {
        setSourceFolder({ name: handle.name, handle });
        toast.success(`Source folder: ${handle.name}`);
      } else {
        setDestinationFolder({ name: handle.name, handle });
        toast.success(`Destination folder: ${handle.name}`);
      }
    } catch (error: any) {
      // User cancelled the picker
      if (error.name !== 'AbortError') {
        toast.error("Gagal memilih folder");
      }
    }
  };

  const resetSelection = () => {
    setSourceFolder(null);
    setDestinationFolder(null);
  };

  const handleOrganize = () => {
    if (sourceFolder && destinationFolder) {
      toast.success(`Organizing files from "${sourceFolder.name}" to "${destinationFolder.name}"`);
      // Here you would implement the actual file organizing logic
    }
  };

  return (
    <div className="flex flex-col h-full w-72 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          Files
        </span>
        {(sourceFolder || destinationFolder) && (
          <button 
            onClick={resetSelection}
            className="p-1 hover:bg-sidebar-accent rounded text-sidebar-foreground"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col px-4 py-6">
        {/* Step 1: Source Folder */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              sourceFolder ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {sourceFolder ? <Check size={14} /> : '1'}
            </div>
            <span className="text-sm font-medium text-foreground">Source Folder</span>
          </div>
          
          {sourceFolder ? (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
              <FolderOpen size={18} className="text-primary shrink-0" />
              <span className="text-sm text-foreground truncate">{sourceFolder.name}</span>
            </div>
          ) : (
            <Button 
              className="w-full gap-2" 
              size="sm"
              onClick={() => selectFolder('source')}
            >
              <FolderInput size={16} />
              Select Source
            </Button>
          )}
        </div>

        {/* Arrow Indicator */}
        <div className="flex justify-center mb-6">
          <ArrowRight size={20} className={`${sourceFolder ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>

        {/* Step 2: Destination Folder */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              destinationFolder ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {destinationFolder ? <Check size={14} /> : '2'}
            </div>
            <span className="text-sm font-medium text-foreground">Destination Folder</span>
          </div>
          
          {destinationFolder ? (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
              <FolderOpen size={18} className="text-primary shrink-0" />
              <span className="text-sm text-foreground truncate">{destinationFolder.name}</span>
            </div>
          ) : (
            <Button 
              className="w-full gap-2" 
              size="sm"
              variant={sourceFolder ? "default" : "outline"}
              disabled={!sourceFolder}
              onClick={() => selectFolder('destination')}
            >
              <FolderInput size={16} />
              Select Destination
            </Button>
          )}
        </div>

        {/* Organize Button */}
        {sourceFolder && destinationFolder && (
          <Button 
            className="w-full gap-2 mt-auto" 
            size="sm"
            onClick={handleOrganize}
          >
            <Check size={16} />
            Start Organizing
          </Button>
        )}
      </div>
    </div>
  );
};
