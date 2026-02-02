import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ExplorerPanel } from "@/components/ExplorerPanel";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { StatusBar } from "@/components/StatusBar";
import { UpdateNotification } from "@/components/UpdateNotification";

const Index = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center h-9 bg-secondary border-b border-border px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">File</span>
          <span className="font-medium">Edit</span>
          <span className="font-medium">Selection</span>
          <span className="font-medium">View</span>
          <span className="font-medium">Go</span>
          <span className="font-medium">Run</span>
          <span className="font-medium">•••</span>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1 bg-muted rounded-md text-sm text-muted-foreground w-96">
            <span>🔍</span>
            <span>Search</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <button className="p-1 hover:bg-muted rounded">▫▫</button>
          <button className="p-1 hover:bg-muted rounded">◻</button>
          <button className="p-1 hover:bg-muted rounded">💬</button>
          <button className="p-1 hover:bg-muted rounded">—</button>
          <button className="p-1 hover:bg-muted rounded">□</button>
          <button className="p-1 hover:bg-muted rounded">✕</button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <ExplorerPanel />
        <WelcomeScreen />
        
        {showNotification && (
          <UpdateNotification onClose={() => setShowNotification(false)} />
        )}
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
