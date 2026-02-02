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
  // Simulated organized result folders
  const organizedFolders = [
    { name: "Documents", count: files.filter(f => ['PDF Document', 'Word Document', 'Text File'].includes(f.type)).length },
    { name: "Images", count: files.filter(f => ['JPEG Image', 'PNG Image', 'GIF Image'].includes(f.type)).length },
    { name: "Videos", count: files.filter(f => ['MP4 Video'].includes(f.type)).length },
    { name: "Audio", count: files.filter(f => ['MP3 Audio'].includes(f.type)).length },
    { name: "Archives", count: files.filter(f => ['ZIP Archive', 'RAR Archive'].includes(f.type)).length },
    { name: "Others", count: files.filter(f => f.isFolder).length },
  ].filter(f => f.count > 0);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Statistics Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BarChart3 size={18} className="text-gray-700" />
          <h2 className="text-base font-semibold text-gray-900">Statistics</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-xs text-gray-500">
              <File size={12} />
              <span>Total Files</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
          </div>
          
          <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-xs text-gray-500">
              <CheckSquare size={12} />
              <span>Processed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{processed}</p>
          </div>
          
          <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-xs text-gray-500">
              <FolderPlus size={12} />
              <span>Folders Created</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{foldersCreated}</p>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="px-6 py-3 bg-white border-b border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-2">{status}</p>
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="h-1.5 bg-gray-200" />
        </div>
      </div>
      
      {/* Split View: Source Files | Result */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Source Files */}
        <div className="flex-1 flex flex-col border-r border-gray-200 bg-white">
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Source Files</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left text-xs text-gray-500 uppercase">
                  <th className="px-3 py-2 font-medium">Filename</th>
                  <th className="px-3 py-2 font-medium">Size</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 font-medium">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-gray-400 text-sm">
                      No files found
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          {file.isFolder ? (
                            <Folder size={14} className="text-amber-500 shrink-0" />
                          ) : (
                            <File size={14} className="text-gray-400 shrink-0" />
                          )}
                          <span className="text-gray-900 truncate">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-gray-500">{file.size}</td>
                      <td className="px-3 py-2 text-gray-500">{file.type}</td>
                      <td className="px-3 py-2 text-gray-500">{file.lastModified}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            {files.length} items
          </div>
        </div>
        
        {/* Right Panel - Organized Result */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Organized Result</h3>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {organizedFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Folder size={48} className="mb-3 opacity-50" />
                <p className="text-sm">Waiting for organization...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {organizedFolders.map((folder, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Folder size={20} className="text-amber-500 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{folder.name}</p>
                      <p className="text-xs text-gray-500">{folder.count} files</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            {organizedFolders.length} folders
          </div>
        </div>
      </div>
    </div>
  );
};
