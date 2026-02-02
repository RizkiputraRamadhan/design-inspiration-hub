import { Sidebar } from "@/components/Sidebar";
import { ExplorerPanel } from "@/components/ExplorerPanel";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { StatusBar } from "@/components/StatusBar";

const Index = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ExplorerPanel />
        <WelcomeScreen />
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
