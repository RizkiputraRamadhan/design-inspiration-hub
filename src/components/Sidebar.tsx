import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  Blocks, 
  CircleUser, 
  Settings, 
  Sparkles,
  MessageSquare
} from "lucide-react";

interface SidebarIconProps {
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
}

const SidebarIcon = ({ icon, active, badge }: SidebarIconProps) => (
  <button className={`sidebar-icon relative ${active ? 'active' : ''}`}>
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
        <SidebarIcon icon={<Files size={22} />} active />
        <SidebarIcon icon={<Search size={22} />} />
        <SidebarIcon icon={<GitBranch size={22} />} />
        <SidebarIcon icon={<Bug size={22} />} />
        <SidebarIcon icon={<Blocks size={22} />} />
        <SidebarIcon icon={<CircleUser size={22} />} />
        <SidebarIcon icon={<Sparkles size={22} />} />
        <SidebarIcon icon={<MessageSquare size={22} />} />
      </div>
      
      <div className="mt-auto flex flex-col items-center py-3 space-y-1">
        <SidebarIcon icon={<CircleUser size={22} />} />
        <SidebarIcon icon={<Settings size={22} />} badge={1} />
      </div>
    </div>
  );
};
