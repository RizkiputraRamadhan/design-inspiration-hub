import { 
  FolderOpen, 
  Sparkles,
  LayoutGrid,
  Settings,
  User
} from "lucide-react";

interface SidebarIconProps {
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
  tooltip?: string;
}

const SidebarIcon = ({ icon, active, badge, tooltip }: SidebarIconProps) => (
  <button 
    className={`sidebar-icon relative ${active ? 'active' : ''}`}
    title={tooltip}
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
  return (
    <div className="flex flex-col h-full w-14 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col items-center py-3 space-y-1">
        <SidebarIcon icon={<FolderOpen size={22} />} active tooltip="Files" />
        <SidebarIcon icon={<Sparkles size={22} />} tooltip="AI Organize" />
        <SidebarIcon icon={<LayoutGrid size={22} />} tooltip="Categories" />
      </div>
      
      <div className="mt-auto flex flex-col items-center py-3 space-y-1">
        <SidebarIcon icon={<User size={22} />} tooltip="Profile" />
        <SidebarIcon icon={<Settings size={22} />} tooltip="Settings" />
      </div>
    </div>
  );
};
