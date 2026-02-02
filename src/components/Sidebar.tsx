import { 
  FolderOpen, 
  Search, 
  History, 
  Settings, 
  Sparkles,
  LayoutGrid,
  Tag,
  Trash2
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
        <SidebarIcon icon={<Search size={22} />} tooltip="Search" />
        <SidebarIcon icon={<Sparkles size={22} />} tooltip="AI Organize" />
        <SidebarIcon icon={<LayoutGrid size={22} />} tooltip="Categories" />
        <SidebarIcon icon={<Tag size={22} />} tooltip="Tags" />
        <SidebarIcon icon={<History size={22} />} tooltip="History" />
        <SidebarIcon icon={<Trash2 size={22} />} tooltip="Duplicates" />
      </div>
      
      <div className="mt-auto flex flex-col items-center py-3 space-y-1">
        <SidebarIcon icon={<Settings size={22} />} tooltip="Settings" />
      </div>
    </div>
  );
};
