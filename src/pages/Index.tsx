import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ExplorerPanel } from "@/components/ExplorerPanel";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { FilePreview } from "@/components/FilePreview";

interface FileItem {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  isFolder: boolean;
}

const Index = () => {
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [processed, setProcessed] = useState(0);
  const [foldersCreated, setFoldersCreated] = useState(0);

  const handleOrganizeStart = (scannedFiles: FileItem[]) => {
    setFiles(scannedFiles);
    setIsOrganizing(true);
    setProcessed(0);
    setFoldersCreated(0);
  };

  const handleStop = () => {
    setIsOrganizing(false);
    setFiles([]);
    setProcessed(0);
    setFoldersCreated(0);
  };

  const totalFiles = files.filter(f => !f.isFolder).length;
  const progress = totalFiles > 0 ? (processed / totalFiles) * 100 : 0;
  const status = isOrganizing 
    ? processed === 0 
      ? "Ready to scan..." 
      : `Processing ${processed} of ${totalFiles} files...`
    : "Ready to scan...";

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ExplorerPanel 
          onOrganizeStart={handleOrganizeStart}
          onStop={handleStop}
          isOrganizing={isOrganizing}
        />
        {isOrganizing ? (
          <FilePreview 
            files={files}
            totalFiles={totalFiles}
            processed={processed}
            foldersCreated={foldersCreated}
            progress={progress}
            status={status}
            isProcessing={isOrganizing}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
};

export default Index;
