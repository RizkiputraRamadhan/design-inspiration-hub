import { useState } from "react";
import { 
  FolderOpen, 
  Sparkles,
  Settings,
  User
} from "lucide-react";
import { AISettingsPanel } from "./AISettingsPanel";

interface SidebarIconProps {
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
  tooltip?: string;
  onClick?: () => void;
}

const SidebarIcon = ({ icon, active, badge, tooltip, onClick }: SidebarIconProps) => (
  <button 
    className={`sidebar-icon relative ${active ? 'active' : ''}`}
    title={tooltip}
    onClick={onClick}
  >
    {icon}
    {badge && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-medium rounded-full bg-primary text-primary-foreground">
        {badge}
      </span>
    )}
  </button>
);

export const Sidebar = () => {
  const [showAISettings, setShowAISettings] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full w-14 bg-sidebar border-r border-sidebar-border relative z-10">
        <div className="flex flex-col items-center py-3 space-y-1">
          <SidebarIcon icon={<FolderOpen size={22} />} active tooltip="Files" />
          <SidebarIcon 
            icon={<Sparkles size={22} />} 
            tooltip="AI Organize" 
            onClick={() => setShowAISettings(!showAISettings)}
          />
          <SidebarIcon icon={<Settings size={22} />} tooltip="Settings" />
        </div>
        
        <div className="mt-auto flex flex-col items-center py-3 space-y-1">
          <SidebarIcon icon={<User size={22} />} tooltip="Profile" />
        </div>
      </div>

      <AISettingsPanel 
        isOpen={showAISettings} 
        onClose={() => setShowAISettings(false)} 
      />
    </>
  );
};
