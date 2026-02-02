import { useState } from "react";
import { FolderOpen, FolderInput, ArrowDown, Check, RotateCcw, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FolderInfo {
  name: string;
  path: string;
  handle: FileSystemDirectoryHandle;
}

interface FolderCardProps {
  step: number;
  label: string;
  folder: FolderInfo | null;
  onSelect: () => void;
  disabled?: boolean;
}

const FolderCard = ({ step, label, folder, onSelect, disabled }: FolderCardProps) => {
  return (
    <div className={`rounded-xl border transition-all ${
      folder 
        ? 'bg-primary/5 border-primary/30' 
        : disabled 
          ? 'bg-muted/30 border-border opacity-60' 
          : 'bg-card border-border hover:border-primary/50'
    }`}>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
            folder ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {folder ? <Check size={16} /> : step}
          </div>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        
        {folder ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FolderOpen size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {folder.name}
                </p>
                <p className="text-xs text-muted-foreground truncate" title={folder.path}>
                  {folder.path}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full gap-2 text-muted-foreground hover:text-foreground"
              onClick={onSelect}
            >
              <RefreshCw size={14} />
              Browse Again
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full gap-2" 
            size="default"
            disabled={disabled}
            onClick={onSelect}
          >
            <FolderInput size={18} />
            Browse Folder
          </Button>
        )}
      </div>
    </div>
  );
};

export const ExplorerPanel = () => {
  const [sourceFolder, setSourceFolder] = useState<FolderInfo | null>(null);
  const [destinationFolder, setDestinationFolder] = useState<FolderInfo | null>(null);

  const selectFolder = async (type: 'source' | 'destination') => {
    try {
      if (!('showDirectoryPicker' in window)) {
        toast.error("Browser tidak mendukung fitur ini. Gunakan Chrome atau Edge terbaru.");
        return;
      }

      const handle = await (window as any).showDirectoryPicker();
      
      // Get relative path representation
      const path = `/${handle.name}`;
      
      if (type === 'source') {
        setSourceFolder({ name: handle.name, path, handle });
        toast.success(`Source: ${handle.name}`);
      } else {
        setDestinationFolder({ name: handle.name, path, handle });
        toast.success(`Destination: ${handle.name}`);
      }
    } catch (error: any) {
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
    }
  };

  return (
    <div className="flex flex-col h-full w-80 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground">
          File Organizer
        </span>
        {(sourceFolder || destinationFolder) && (
          <button 
            onClick={resetSelection}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded transition-colors"
            title="Reset All"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-auto">
        {/* Source Folder */}
        <FolderCard
          step={1}
          label="Source Folder"
          folder={sourceFolder}
          onSelect={() => selectFolder('source')}
        />

        {/* Arrow */}
        <div className="flex justify-center py-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            sourceFolder ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
          }`}>
            <ArrowDown size={18} />
          </div>
        </div>

        {/* Destination Folder */}
        <FolderCard
          step={2}
          label="Destination Folder"
          folder={destinationFolder}
          onSelect={() => selectFolder('destination')}
          disabled={!sourceFolder}
        />

        {/* Organize Button */}
        {sourceFolder && destinationFolder && (
          <div className="pt-4">
            <Button 
              className="w-full gap-2 h-11" 
              size="lg"
              onClick={handleOrganize}
            >
              <Check size={18} />
              Start Organizing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
