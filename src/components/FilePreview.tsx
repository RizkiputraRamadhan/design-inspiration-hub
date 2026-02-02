import { File, CheckSquare, FolderPlus, BarChart3, Folder } from "lucide-react";
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
  return (
    <div className="flex-1 flex flex-col bg-white text-gray-900 overflow-hidden">
      {/* Statistics Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BarChart3 size={20} className="text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-600">
              <File size={14} />
              <span>Total Files</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalFiles}</p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-600">
              <CheckSquare size={14} />
              <span>Processed</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{processed}</p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-600">
              <FolderPlus size={14} />
              <span>Folders Created</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{foldersCreated}</p>
          </div>
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-3">{status}</p>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>
      
      {/* File List Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3 font-medium">Filename</th>
              <th className="px-4 py-3 font-medium">Filesize</th>
              <th className="px-4 py-3 font-medium">Filetype</th>
              <th className="px-4 py-3 font-medium">Last modified</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No files scanned yet
                </td>
              </tr>
            ) : (
              files.map((file, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {file.isFolder ? (
                        <Folder size={16} className="text-yellow-500" />
                      ) : (
                        <File size={16} className="text-gray-400" />
                      )}
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{file.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{file.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{file.lastModified}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Stats */}
      <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 text-sm text-gray-600">
        {files.length} files and folders
      </div>
    </div>
  );
};
