import { Cpu, HardDrive, Wifi, MemoryStick, CheckCircle } from "lucide-react";

interface StatusBarProps {
  isProcessing?: boolean;
  elapsedTime?: string;
  status?: string;
}

export const StatusBar = ({ isProcessing = false, elapsedTime = "00:00", status = "Ready to scan" }: StatusBarProps) => {
  return (
    <div className="flex items-center justify-between h-7 px-4 bg-secondary border-t border-border text-xs">
      {/* Left - Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-400 animate-pulse' : 'bg-success'}`} />
          <span className="text-foreground font-medium">{status}</span>
        </div>
        <span className="text-muted-foreground">
          Completed: <span className="text-foreground">{elapsedTime}</span>
        </span>
      </div>
      
      {/* Right - System Info */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <Cpu size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">CPU</span>
          <span className="text-foreground">12%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MemoryStick size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">Memory</span>
          <span className="text-foreground">45%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDrive size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">Disk</span>
          <span className="text-foreground">2%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">Network</span>
          <span className="text-foreground">0 KB/s</span>
        </div>
      </div>
    </div>
  );
};
