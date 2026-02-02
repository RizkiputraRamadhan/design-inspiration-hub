import { File, CheckSquare, FolderPlus, BarChart3, Folder, ChevronRight } from "lucide-react";
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
}

export const FilePreview = ({ 
  files, 
  totalFiles, 
  processed, 
  foldersCreated,
  progress,
  status 
}: FilePreviewProps) => {
  const organizedFolders = [
    { name: "Documents", count: files.filter(f => ['PDF Document', 'Word Document', 'Text File'].includes(f.type)).length },
    { name: "Images", count: files.filter(f => ['JPEG Image', 'PNG Image', 'GIF Image'].includes(f.type)).length },
    { name: "Videos", count: files.filter(f => ['MP4 Video'].includes(f.type)).length },
    { name: "Audio", count: files.filter(f => ['MP3 Audio'].includes(f.type)).length },
    { name: "Archives", count: files.filter(f => ['ZIP Archive', 'RAR Archive'].includes(f.type)).length },
    { name: "Others", count: files.filter(f => f.isFolder).length },
  ].filter(f => f.count > 0);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Statistics Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center justify-center gap-2 mb-5">
          <BarChart3 size={18} className="text-foreground" />
          <h2 className="text-base font-semibold text-foreground">Statistics</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="px-5 py-4 rounded-xl border-2 border-primary/50 bg-card text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-muted-foreground">
              <File size={14} />
              <span>Total Files</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalFiles}</p>
          </div>
          
          <div className="px-5 py-4 rounded-xl border-2 border-primary/50 bg-card text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-muted-foreground">
              <CheckSquare size={14} />
              <span>Processed</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{processed}</p>
          </div>
          
          <div className="px-5 py-4 rounded-xl border-2 border-primary/50 bg-card text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-muted-foreground">
              <FolderPlus size={14} />
              <span>Folders Created</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{foldersCreated}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mt-5">
          <p className="text-sm text-muted-foreground text-center mb-3">{status}</p>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>
      </div>
      
      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Source Files */}
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Source Files</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50">
                <tr className="text-left text-xs text-muted-foreground uppercase">
                  <th className="px-4 py-3 font-semibold">Filename</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                      No files found
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {file.isFolder ? (
                            <Folder size={16} className="text-amber-400 shrink-0" />
                          ) : (
                            <File size={16} className="text-muted-foreground shrink-0" />
                          )}
                          <span className="text-foreground">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{file.size}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.lastModified}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
            {files.length} items
          </div>
        </div>
        
        {/* Right Panel - Organized Result */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Organized Result</h3>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {organizedFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Folder size={48} className="mb-3 opacity-30" />
                <p className="text-sm">Waiting for organization...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {organizedFolders.map((folder, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <Folder size={22} className="text-amber-400 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.count} files</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
            {organizedFolders.length} folders
          </div>
        </div>
      </div>
    </div>
  );
};
