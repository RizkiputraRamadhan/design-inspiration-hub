import { HardDrive, Wifi } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="flex items-center justify-between h-6 px-3 bg-secondary text-secondary-foreground text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <HardDrive size={12} />
          <span>Ready</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Wifi size={12} />
          <span>AI Connected</span>
        </div>
        <span className="text-primary">FileAI v1.0</span>
      </div>
    </div>
  );
};
