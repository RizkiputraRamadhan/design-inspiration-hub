import { useState, useEffect } from "react";
import { File, CheckSquare, FolderPlus, Folder, ChevronRight, Activity, Cpu, HardDrive, Wifi, MemoryStick } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileItem {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  isFolder: boolean;
}

interface FilePreviewProps {
  files: FileItem[];
  totalFiles: number;
  processed: number;
  foldersCreated: number;
  progress: number;
  status: string;
  isProcessing?: boolean;
}

export const FilePreview = ({ 
  files, 
  totalFiles, 
  processed, 
  foldersCreated,
  progress,
  status,
  isProcessing = false
}: FilePreviewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isProcessing) {
        setElapsedTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isProcessing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  const organizedFolders = [
    { name: "Documents", count: files.filter(f => ['PDF Document', 'Word Document', 'Text File'].includes(f.type)).length },
    { name: "Images", count: files.filter(f => ['JPEG Image', 'PNG Image', 'GIF Image'].includes(f.type)).length },
    { name: "Videos", count: files.filter(f => ['MP4 Video'].includes(f.type)).length },
    { name: "Audio", count: files.filter(f => ['MP3 Audio'].includes(f.type)).length },
    { name: "Archives", count: files.filter(f => ['ZIP Archive', 'RAR Archive'].includes(f.type)).length },
    { name: "Others", count: files.filter(f => f.isFolder).length },
  ].filter(f => f.count > 0);

  const operationStatus = isProcessing ? "Processing..." : processed > 0 ? "Operation complete" : "Ready to scan";

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Top Bar - Stats Left + Status Right */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20">
        {/* Stats - Left Side */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <File size={14} className="text-primary" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted-foreground">Files</span>
              <span className="text-lg font-bold text-foreground">{totalFiles}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <CheckSquare size={14} className="text-success" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted-foreground">Processed</span>
              <span className="text-lg font-bold text-foreground">{processed}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <FolderPlus size={14} className="text-amber-400" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted-foreground">Folders</span>
              <span className="text-lg font-bold text-foreground">{foldersCreated}</span>
            </div>
          </div>
        </div>

        {/* Status & Progress - Right Side */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-border">
          <div className="relative shrink-0">
            <Activity size={16} className="text-primary" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">{status}</span>
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-muted" />
          </div>
        </div>
      </div>
      
      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Source Files */}
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Source Files</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                <tr className="text-left text-xs text-muted-foreground uppercase">
                  <th className="px-4 py-2.5 font-semibold">Filename</th>
                  <th className="px-4 py-2.5 font-semibold">Size</th>
                  <th className="px-4 py-2.5 font-semibold">Type</th>
                  <th className="px-4 py-2.5 font-semibold">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                      No files found
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr key={index} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          {file.isFolder ? (
                            <Folder size={15} className="text-amber-400 shrink-0" />
                          ) : (
                            <File size={15} className="text-muted-foreground shrink-0" />
                          )}
                          <span className="text-foreground text-sm">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground text-sm">{file.size}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-sm">{file.type}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-sm">{file.lastModified}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Right Panel - Organized Result */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Organized Result</h3>
          </div>
          <div className="flex-1 overflow-auto p-3">
            {organizedFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Folder size={40} className="mb-2 opacity-30" />
                <p className="text-sm">Waiting for organization...</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {organizedFolders.map((folder, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border/50 bg-card/50 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <Folder size={18} className="text-amber-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.count} files</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Status Bar */}
      <div className="border-t border-border bg-muted/30">
        {/* Main Status Row */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${isProcessing ? 'bg-amber-400 animate-pulse' : processed > 0 ? 'bg-success' : 'bg-muted-foreground'}`} />
            <CheckSquare size={14} className="text-muted-foreground" />
            <Folder size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {foldersCreated > 0 ? `Created ${foldersCreated} folders` : 'Ready to organize'}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{formatCurrentTime(currentTime)}</span>
        </div>

        {/* Details Row */}
        <div className="flex items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">
              Completed in: <span className="text-foreground">{formatTime(elapsedTime)}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Remaining: <span className="text-foreground">00:00</span>
            </span>
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
              <div className="flex items-center gap-1.5">
                <Cpu size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">CPU</span>
                <span className="text-xs text-foreground">12%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MemoryStick size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Memory</span>
                <span className="text-xs text-foreground">45%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Disk</span>
                <span className="text-xs text-foreground">2%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Network</span>
                <span className="text-xs text-foreground">0 KB/s</span>
              </div>
            </div>
          </div>
          
          <span className={`text-xs font-medium ${processed > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {operationStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
