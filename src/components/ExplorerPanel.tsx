import { useState, useEffect } from "react";
import { FolderOpen, Sparkles, Search, Square, RotateCcw, FolderOutput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FolderInfo {
  name: string;
  path: string;
  handle: FileSystemDirectoryHandle;
}

interface FileItem {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  isFolder: boolean;
}

interface ExplorerPanelProps {
  onOrganizeStart: (files: FileItem[]) => void;
  onStop: () => void;
  isOrganizing: boolean;
  showMoveDestination: boolean;
}

export const ExplorerPanel = ({ onOrganizeStart, onStop, isOrganizing, showMoveDestination }: ExplorerPanelProps) => {
  const [sourceFolder, setSourceFolder] = useState<FolderInfo | null>(null);
  const [destinationFolder, setDestinationFolder] = useState<FolderInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsProcessing(isOrganizing);
  }, [isOrganizing]);

  const selectFolder = async (type: 'source' | 'destination') => {
    try {
      if (!('showDirectoryPicker' in window)) {
        toast.error("Browser does not support this feature. Use latest Chrome or Edge.");
        return;
      }

      const handle = await (window as any).showDirectoryPicker();
      const path = handle.name;
      
      if (type === 'source') {
        setSourceFolder({ name: handle.name, path, handle });
        toast.success(`Source folder selected: ${handle.name}`);
      } else {
        setDestinationFolder({ name: handle.name, path, handle });
        toast.success(`Destination folder selected: ${handle.name}`);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error("Failed to select folder");
      }
    }
  };

  const resetSelection = () => {
    setSourceFolder(null);
    setDestinationFolder(null);
    setIsProcessing(false);
    onStop();
  };

  const handleScanFiles = async () => {
    if (sourceFolder) {
      toast.info(`Scanning files in "${sourceFolder.name}"...`);
      
      try {
        const files: FileItem[] = [];
        
        for await (const entry of (sourceFolder.handle as any).values()) {
          const isFolder = entry.kind === 'directory';
          let size = '-';
          let lastModified = '-';
          
          if (!isFolder) {
            try {
              const file = await entry.getFile();
              size = formatFileSize(file.size);
              lastModified = new Date(file.lastModified).toLocaleDateString('en-US');
            } catch (e) {
              // Skip files that can't be read
            }
          }
          
          files.push({
            name: entry.name,
            size: isFolder ? '-' : size,
            type: isFolder ? 'File folder' : getFileType(entry.name),
            lastModified: isFolder ? '-' : lastModified,
            isFolder
          });
        }
        
        toast.success(`Found ${files.length} items`);
        onOrganizeStart(files);
        setIsProcessing(true);
      } catch (error) {
        toast.error("Failed to read folder");
      }
    }
  };

  const handleOrganize = async () => {
    if (sourceFolder) {
      await handleScanFiles();
    }
  };

  const handleStop = () => {
    setIsProcessing(false);
    onStop();
    toast.info("Process stopped");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const types: Record<string, string> = {
      'pdf': 'PDF Document',
      'doc': 'Word Document',
      'docx': 'Word Document',
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet',
      'jpg': 'JPEG Image',
      'jpeg': 'JPEG Image',
      'png': 'PNG Image',
      'gif': 'GIF Image',
      'mp4': 'MP4 Video',
      'mp3': 'MP3 Audio',
      'txt': 'Text File',
      'zip': 'ZIP Archive',
      'rar': 'RAR Archive',
    };
    return types[ext] || `${ext.toUpperCase()} File`;
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
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col p-3 space-y-3 overflow-auto">
        {/* Source Folder Path - Desktop Style */}
        <div className="rounded-md bg-card border border-border">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
            <FolderOpen size={14} className="text-primary shrink-0" />
            <span className="text-xs font-medium text-foreground">Source Folder</span>
          </div>
          
          <div className="p-2">
            <div className="flex items-center gap-1">
              <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 bg-background rounded border border-input text-xs font-mono">
                <FolderOpen size={12} className="text-muted-foreground shrink-0" />
                <span className="text-muted-foreground truncate">
                  {sourceFolder ? sourceFolder.path : "No folder selected"}
                </span>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="h-7 px-2.5 text-xs shrink-0"
                onClick={() => selectFolder('source')}
              >
                Browse...
              </Button>
            </div>
          </div>
        </div>

        {/* Destination Folder Path - Desktop Style */}
        {showMoveDestination && (
          <div className="rounded-md bg-card border border-border">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
              <FolderOutput size={14} className="text-primary shrink-0" />
              <span className="text-xs font-medium text-foreground">Destination Folder</span>
            </div>
            
            <div className="p-2">
              <div className="flex items-center gap-1">
                <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 bg-background rounded border border-input text-xs font-mono">
                  <FolderOutput size={12} className="text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground truncate">
                    {destinationFolder ? destinationFolder.path : "No folder selected"}
                  </span>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="h-7 px-2.5 text-xs shrink-0"
                  onClick={() => selectFolder('destination')}
                >
                  Browse...
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Actions - Desktop Style */}
        <div className="rounded-md bg-card border border-border">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
            <Sparkles size={14} className="text-primary shrink-0" />
            <span className="text-xs font-medium text-foreground">Actions</span>
          </div>
          
          <div className="p-2 space-y-1.5">
            <Button 
              variant="outline"
              size="sm"
              className="w-full h-8 gap-2 text-xs justify-start"
              disabled={!sourceFolder}
              onClick={handleScanFiles}
            >
              <Search size={14} />
              Scan Files
            </Button>
            
            <Button 
              size="sm"
              className="w-full h-8 gap-2 text-xs justify-start bg-success hover:bg-success/90 text-success-foreground"
              disabled={!sourceFolder || isProcessing}
              onClick={handleOrganize}
            >
              <Sparkles size={14} />
              Start Organizing
            </Button>
            
            <Button 
              variant="destructive"
              size="sm"
              className="w-full h-8 gap-2 text-xs justify-start"
              disabled={!isProcessing}
              onClick={handleStop}
            >
              <Square size={14} />
              Stop Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};