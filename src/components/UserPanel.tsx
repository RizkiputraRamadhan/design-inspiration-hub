import { X, User, LogIn, LogOut, Monitor, Cpu, BarChart3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface UserPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

export const UserPanel = ({ isOpen, onClose }: UserPanelProps) => {
  // Mock user state - replace with real auth later
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock user data
  const mockUser = {
    id: "23C-C871",
    email: "user@DESKTOP-OTIMQKI",
    verified: true,
  };

  // Mock system info
  const systemInfo = {
    os: "Windows 10",
    computerName: "DESKTOP-OTIMQKI",
    username: "user",
    hardwareId: "aab767a3",
    platform: "Windows 10",
  };

  // Mock usage stats
  const usageStats = {
    totalRuns: 27,
    filesOrganized: 582,
    foldersCreated: 7,
    firstRun: "2026-01-31",
    lastRun: "2026-02-02",
  };

  // Mock app info
  const appInfo = {
    version: "1.0.0",
    build: "Professional",
    features: "AI-Powered Organization",
    license: "Single Computer",
    support: "Local Installation",
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-14 top-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r border-border shadow-xl z-20 animate-in slide-in-from-left-2 duration-200 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">User Information</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
        {!isLoggedIn ? (
          /* Not Logged In State */
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <User size={40} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">Not Logged In</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Login to access your account and sync your data
            </p>
            <Button onClick={handleLogin} className="gap-2">
              <LogIn size={16} />
              Login
            </Button>
          </div>
        ) : (
          /* Logged In State */
          <>
            {/* User Profile Card */}
            <div className="rounded-lg bg-card border border-border overflow-hidden">
              <div className="relative h-2 bg-gradient-to-r from-primary to-primary/50" />
              <div className="p-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3">
                  <User size={32} className="text-primary-foreground" />
                </div>
                <h4 className="text-lg font-bold text-foreground">ID: {mockUser.id}</h4>
                <p className="text-sm text-muted-foreground mb-1">{mockUser.email}</p>
                {mockUser.verified && (
                  <span className="text-xs font-medium text-success">Verified</span>
                )}
              </div>
            </div>

            {/* System Information */}
            <div className="rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <Monitor size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">System Information</span>
              </div>
              <div className="px-4 py-2 divide-y divide-border/50">
                <InfoRow label="Operating System:" value={systemInfo.os} />
                <InfoRow label="Computer Name:" value={systemInfo.computerName} />
                <InfoRow label="Username:" value={systemInfo.username} />
                <InfoRow label="Hardware ID:" value={systemInfo.hardwareId} />
                <InfoRow label="Platform:" value={systemInfo.platform} />
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <BarChart3 size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Usage Statistics</span>
              </div>
              <div className="px-4 py-2 divide-y divide-border/50">
                <InfoRow label="Total Runs:" value={usageStats.totalRuns.toString()} />
                <InfoRow label="Files Organized:" value={usageStats.filesOrganized.toString()} />
                <InfoRow label="Folders Created:" value={usageStats.foldersCreated.toString()} />
                <InfoRow label="First Run:" value={usageStats.firstRun} />
                <InfoRow label="Last Run:" value={usageStats.lastRun} />
              </div>
            </div>

            {/* Application Info */}
            <div className="rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <Info size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Application Info</span>
              </div>
              <div className="px-4 py-2 divide-y divide-border/50">
                <InfoRow label="Version:" value={appInfo.version} />
                <InfoRow label="Build:" value={appInfo.build} />
                <InfoRow label="Features:" value={appInfo.features} />
                <InfoRow label="License:" value={appInfo.license} />
                <InfoRow label="Support:" value={appInfo.support} />
              </div>
            </div>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="w-full gap-2 text-destructive hover:text-destructive"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </>
        )}
        </div>
      </ScrollArea>
    </div>
  );
};
